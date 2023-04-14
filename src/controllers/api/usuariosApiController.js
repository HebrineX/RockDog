const db = require("../../database/models");
const sequelize = db.sequelize;

//-------------controladores----------------------------------
module.exports={
    index : (req,res)=>{
        db.Usuario.findAll({
            attributes : [
                "id" ,
                "nombre" ,
                "apellido",
                "email",
                "estado",
                "imagen"]
        })
        .then(users=>{
            let respuesta = {
                meta :{status:200,
                    count : users.length,
                    url:"/api/user"
                },
                data:users
            }
            
            res.json(respuesta)
        })
        .catch(error => console.log(error))
    },
    perfilUsuario : (req,res)=>{
        let idUser = req.params.id
        db.Usuario.findByPk(idUser,{
            attributes : [
                "id" ,
                "nombre" ,
                "apellido",
                "email",
                "estado",
                "imagen"]
        })
        .then(user=>{
            let respuesta = {
                meta :{status:200,
                    count : user.length,
                    url:"/api/user/:id"
                },
                data:user
            }
            
            res.json(respuesta)
        })
        
        .catch(error => console.log(error))
    }
}