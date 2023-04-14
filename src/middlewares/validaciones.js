const { check ,body} = require("express-validator");
const db = require("../database/models");
const sequelize = db.sequelize;

const validaciones={
    registro :[
            check('nombre').isLength({
                min : 2
            }).withMessage("El campo de nombre no puede estar vacío!"),
            
            check("apellido").isLength({
                min : 2
            }).withMessage("El campo de Apellido no puede estar vacío!"),
            
            check("email").isEmail().withMessage("Agregar un email válido"),
            
           
            
            check("password").isLength({min: 8 }).withMessage("La contraseña debe tener un mínimo de 8 caractéres"),
            
            check("passwordValid").isLength({min: 8 }).withMessage("La confirmación de la contraseña debe tener un mínimo de 8 caractéres"),

            check("passwordValid").custom((value, {req})=>{
                if(req.body.password == value){
                    return true
                }else{
                    return false
                }
            }).withMessage("Las contraseñas deben ser iguales"),

            check("fotoPerfil").custom((value,{req})=>{
                if(req.file){
                    return true
                }
                return false
            }).withMessage("Debe elegir su Foto de perfil "),
            
            check("fotoPerfil").custom((value, {req}) =>{
                if(req.file.mimetype.startsWith("image/")){
                    return true
                }
                return false
                
            }).withMessage('que parte de imagen no entendiste'),
            
            check("fotoPerfil").custom((value, {req}) =>{
                if(req.file.size <= 40485760){
                    return true
                }
                return false
                
            }).withMessage('La imagen tiene que pesar menos de 5Mb'),
            
            
            ],
    login : [
            check('email').isEmail().withMessage('Agregar un email válido'),
            
            check('password').isLength({min: 8 }).withMessage('La contraseña debe tener un mínimo de 8 caractéres'),
            
            check('email').custom( (value  ) =>{
                db.Usuario.findOne({where:{email :value}})
                .then(result=>{
                    if(result){
                    return true
                    }
                    return false
                })
            }).withMessage('Usuario no se encuentra registrado...')
            ],

    producto:[
        check('nombreProducto').isLength({
                min : 5
            }).withMessage("El Nombre del producto no puede tener menos de 5 caracteres!!"),

            check('descripcion').isLength({
                min : 20
            }).withMessage("La descripcion del producto no puede tener menos de 20 caracteres!!"),
            
            check("detalle").notEmpty().withMessage("Che detalle no puede estar vacio"),
            check("precioProducto").notEmpty().withMessage("Che el precio no puede estar vacio"),
            check("stock").notEmpty().withMessage("Che el stock no puede estar vacio"),
            check("categorias").notEmpty().withMessage("Che las categorias no puede estar vacio"),
            check("marca").notEmpty().withMessage("Che la marca no puede estar vacio"),
            check("imagenProducto").custom((value,{req})=>{
                if(req.file){
                    return true
                }
                return false
            }).withMessage("El producto no puede estar sin imagen "),
            
            check("imagenProducto").custom((value, {req}) =>{
                if(req.file.mimetype.startsWith("image/")){
                    return true
                }
                return false
                
            }).withMessage('que parte de imagen no entendiste'),
            
            check("imagenProducto").custom((value, {req}) =>{
                if(req.file.size <= 40485760){
                    return true
                }
                return false
                
            }).withMessage('La imagen tiene que pesar menos de 5Mb'),
            
            ],

        productoEditar:[
            check('nombreProducto').isLength({
                min : 5
            }).withMessage("El Nombre del producto no puede tener menos de 5 caracteres!!"),
    
            check('descripcion').isLength({
                min : 20
            }).withMessage("La descripcion del producto no puede tener menos de 20 caracteres!!"),
            
            check("detalle").notEmpty().withMessage("Che detalle no puede estar vacio"),
            check("precioProducto").notEmpty().withMessage("Che el precio no puede estar vacio"),
            check("stock").notEmpty().withMessage("Che el stock no puede estar vacio"),
            check("imagenProducto").custom((value, {req}) =>{
                
                    if(req.file){
                        if(req.file.mimetype.startsWith("image/")){
                            return true
                        }
                        return false
                    }
                    return true
                
                
            }).withMessage('que parte de imagen no entendiste'),
            
            check("imagenProducto").custom((value, {req}) =>{
                if(req.file){
                    if(req.file.size <= 40485760){
                        return true
                    }
                    return false
                }
                return true
                
                
            }).withMessage('La imagen tiene que pesar menos de 5Mb'),
            
            ],
            registroEditar :[
                check('nombre').isLength({
                    min : 2
                }).withMessage("El campo de nombre no puede estar vacío!"),
                
                check("apellido").isLength({
                    min : 2
                }).withMessage("El campo de Apellido no puede estar vacío!"),
                
                check("email").isEmail().withMessage("Agregar un email válido"),
                
                
                check("passwordOld").isLength({min: 8 }).withMessage("La contraseña actual no puede estar vacia"),
                
    
                
                
                
                ]

}

module.exports = validaciones