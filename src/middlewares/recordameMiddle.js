const db = require("../database/models");
const sequelize = db.sequelize;


function recordameMiddle (req,res,next){
  
    if(req.cookies.recordame != undefined && req.session.usuarioLogeado == undefined){
            
            
            db.Usuario.findOne({where:{email : req.cookies.recordame}})
            .then(result=>{
                req.session.usuarioLogeado  = result
            })
    }
    next();
}

module.exports = recordameMiddle