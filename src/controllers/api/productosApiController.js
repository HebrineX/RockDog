const db = require("../../database/models");
const sequelize = db.sequelize;
const {check,validationResult,body} = require("express-validator");
//-------------controladores----------------------------------
module.exports={
    index : (req,res)=>{
        let productos = db.Producto.findAll( { where: {estado : 0} ,include: [{association: 'marcas'},{association:"categorias"}]})
        let categorias = db.Categoria.findAll({include:[{association:"productos",where:{estado : 0}}]})
        Promise.all([productos, categorias])
        .then(([productos,categoria])=>{
                let countByCategory=categoria.map(element => {
                
                        nombre= element.categoria,
                        cantidadProd = element.productos.length
                        resultado = {categoria : nombre,
                                    cantidad : cantidadProd}
                        return resultado
                        
                })
                
                let respuesta ={
                    meta:{
                        status:200,
                        count:productos.length,
                        countByCategoria : countByCategory ,
                        url:"/api/productos"
                        
                    },
                    data: productos
                }
                res.json(respuesta)
            })
            .catch(error => console.log(error))
        },
    
    //---Crear productos----
    create : async (req,res)=>{
        let errors = validationResult(req);
        if(errors.isEmpty()){
            // si errores esta vacio
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

                .then(confirm=>{
                    let respuesta ;
                    if(confirm){
                        respuesta = {
                            meta : {
                                status : 200,
                                total:confirm.length,
                                url: "api/productos/create"
                            },
                            data : confirm
                        }
                    }else{
                        respuesta = {
                            meta : {
                                status : 200,
                                total:confirm.length,
                                url: "api/productos/create"
                            },
                            data : confirm
                        }
                    }
                    
                })
                .catch(error => res.send(error))

        }else{
            let nuevoProducto = {
                nombreProducto:req.body.nombreProducto,
                descripcion : req.body.descripcion,
                colorPeso : req.body.colorPeso,
                precioProducto : req.body.precioProducto,
                categoria : req.body.categorias,
                marca : req.body.marca,
            }

            console.log(errors)
        unlink(req.file.path)
        return res.render("crearProducto", {nuevoProducto,errors: errors.errors})
        }
    },
    marcas:(req,res)=>{
        db.Marca.findAll()
        .then(result=>{
            
             let respuesta = {
                 meta : {
                     status : 200,
                     total : result.length,
                     url : "api/productos/marcas"
                 },
                 data : result
             }
             res.json(respuesta)
        })
    }
    

}
