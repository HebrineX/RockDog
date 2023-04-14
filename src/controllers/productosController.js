//------------- Validaciones----------------------------------
const {check,validationResult,body} = require("express-validator");
const path = require("path");
const {unlink}= require("fs-extra")
//------------- punto. MIL -----------------------------------
const divisorNumerico = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require("../database/models");
const sequelize = db.sequelize;

//-------------controladores----------------------------------
module.exports={
    //-----Productos---

    guardarProducto :async (req,res)=>{
        let errors = validationResult(req);
        console.log(errors)
        if(errors.isEmpty()){
            
                const producto =  await db.Producto.create({
                    nombre_producto : req.body.nombreProducto,
                    descripcion:req.body.descripcion,
                    detalle : req.body.detalle,
                    imagen: req.file.filename,
                    estado : 0,
                    precio : req.body.precioProducto,
                    stock: req.body.stock,
                    FK_marca:req.body.marca
                });
                let idCategoria = req.body.categorias
                const categoriaprod =  await db.Categoria.findByPk(idCategoria)
                
                producto.addCategoria(categoriaprod)

                .then(result=>{
                    res.redirect("/")
                })
        }else{
            let nuevoProducto = {
                nombreProducto:req.body.nombreProducto,
                descripcion : req.body.descripcion,
                colorPeso : req.body.colorPeso,
                precioProducto : req.body.precioProducto,
            }

            console.log(errors)
            if(req.file){
                unlink(req.file.path)}
        let Marca = db.Marca.findAll()
        let Categoria = db.Categoria.findAll()
        Promise.all([Marca, Categoria])
            .then(([marca,categoria])=>{
                return res.render("crearProducto",{nuevoProducto,errors: errors.errors,marca,categoria});
            })
        
        }
        
    },
    guardarEdiciones: (req, res) => {
        let errors = validationResult(req);
        console.log(errors)
        if(errors.isEmpty()){
            
            

                const producto = {
                    nombre_producto : req.body.nombreProducto,
                    descripcion:req.body.descripcion,
                    detalle : req.body.detalle,
                    imagen: req.file ? req.file.filename : req.body.oldImagen,
                    estado : 0,
                    precio : req.body.precioProducto,
                    stock: req.body.stock,
                    FK_marca:req.body.marca
                };
            
                const subidaProd = db.Producto.update(producto,{where:{id:req.params.id}})
                const updateCategoria = db.Categoria_Producto.update({ID_categoria :req.body.categorias},{where:{id:req.params.id}})
                Promise.all([subidaProd,updateCategoria])
                .then(() =>{
                    res.redirect("/")
                })
            
            }else{
                let sa = req.body
                console.log(sa)
                let Product = db.Producto.findByPk(req.params.id, {include: [{association: 'marcas'}, {association: 'categorias'}]})
                let Marca = db.Marca.findAll()
                let Categoria = db.Categoria.findAll()
                Promise.all([Product,Marca, Categoria])
                .then(([product,marca,categoria])=>{
                
                
                return res.render("editarProducto",{product,marca,categoria,errors: errors.errors});
            })
            
            }
    },    
    borrarProducto: (req, res) => {
        db.Producto.update({estado :1 },{where:{id:req.params.id}})
        .then(()=>{
            res.redirect("/")
        })
    },
    activarProducto: (req, res) => {
        db.Producto.update({estado :0 },{where:{id:req.params.id}})
        .then(()=>{
            res.redirect("/")
        })
    },

}

