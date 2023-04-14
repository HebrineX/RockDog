
//------------- Validaciones----------------------------------
const {check,validationResult,body} = require("express-validator");
const bcrypt = require("bcryptjs");
const path = require("path");
const {unlink}= require("fs-extra")
const db = require("../database/models");
const sequelize = db.sequelize;


module.exports={
    usuarioNuevo: (req,res)=>{
        let errors = validationResult(req);
        
        if (errors.isEmpty()) {
            db.Usuario.findOne({where:{email :req.body.email}})
            .then(result =>{
                if(!result){
                    let nuevoUsuario = {
                        nombre : req.body.nombre,
                        apellido : req.body.apellido,
                        email : req.body.email,
                        password :bcrypt.hashSync(req.body.password, 10),
                        rango : 1,
                        estado : 0,
                        imagen : req.file.filename
                    }
                    
                    db.Usuario.create(nuevoUsuario)
                    .then(()=>{
                        res.redirect("/user/login")
                    })
                }else{
                    return res.render("registro", {errors:[
                        {msg: "El email ya esta registrado"}
                    ]})
                }
            }
            )

           
        }else{
            if(req.file){
                unlink(req.file.path)
            }
        return res.render("registro", {errors: errors.errors})
        }
},
    
    guardarEdiciones: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let idUser = req.params.id
            if(req.file){
                unlink(path.resolve(path.join(__dirname,"../../public/images/avatars/",req.body.oldImagen)))
            }
            
            
            let editUser = {
                nombre: req.body.nombre,
                apellido : req.body.apellido,
                email : req.body.email,
                password : req.body.password.length == 0  ? bcrypt.hashSync(req.body.passwordOld, 12):bcrypt.hashSync(req.body.password, 12),
                estado : 0,
                imagen : req.file ? req.file.filename : req.body.oldImagen      
            }
            db.Usuario.findByPk(idUser)
            .then(result=>{
                if(result){
                    if(bcrypt.compareSync(req.body.passwordOld ,result.password )){
                        db.Usuario.update(editUser,{where:{id:idUser}})
                        .then(sa=>{
                            res.redirect("/")
                        })
                    }else{
                        return res.render("editarUsuarios", {
                            user:result,
                            errors:[
                                {msg: "Contraseña antigua incorrecta"}
                            ]
                        })
                    }
                }
            })
            
            }else{
            if(req.file){
                unlink(req.file.path)
            }
            let id = req.params.id;
            db.Usuario.findByPk(id)
            .then(result=>{
                return res.render("editarUsuarios", {
                    user:result,
                    errors: errors.errors
                })
            })
    }
    },

    borrarUsuario: (req, res) => {
        let idUser = req.params.id
        db.Usuario.update({estado :1 },{where:{id:idUser}})
        .then(()=>{
            res.redirect("/")
        })
    },
    activarUsuario: (req, res) => {
        let idUser = req.params.id
        db.Usuario.update({estado :0 },{where:{id:idUser}})
        .then(()=>{
            res.redirect("/")
        })
    },
    
    
    usuarioLogeo : (req,res)=>{
        let errors = validationResult(req);
        let usuarioAlogearse = undefined
        if(errors.isEmpty()){ 
            db.Usuario.findOne({where:{email : req.body.email}})
            .then(result=>{
                if(result.estado == 0){
                    if(result){
                        if(bcrypt.compareSync(req.body.password ,result.password )){
                            usuarioAlogearse = result
                        }
                    }
                    if(usuarioAlogearse == undefined){
                        return res.render("login", {errors:[
                            {msg: "Credenciales Invalidas"}
                        ]})
                    }
                    req.session.usuarioLogeado = usuarioAlogearse
                    if(req.body.recuerdame != undefined){
                        res.cookie('recordame' , usuarioAlogearse.email, {maxAge : 1000*60*60*64})
                    }
                    res.redirect("/")
                }else{
                    return res.render("login", {errors:[
                    {msg: "El usuario esta desactivado, Contactese con el administrador"}
                ]})
                }
            })
        }else{
                return res.render("login", {errors: errors.errors})
        }
    },
    cerrarSession: (req,res) =>{
        req.session.destroy();
        res.cookie('recordame',null,{maxAge: -1});
        res.redirect('/')
    }

}