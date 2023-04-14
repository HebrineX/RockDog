
const db = require("../database/models");
const sequelize = db.sequelize;


module.exports = (req,res,next) =>{
    res.locals.usuario = false;
    if(req.session.usuarioLogeado){
        res.locals.usuario = req.session.usuarioLogeado;
        return next();
    }else if(req.cookies.email){
        db.Usuario.findOne({where:{email : req.body.email}})
        .then(result=>{
            req.session.usuario = result
            res.locals.usuario =  result
            return next();
        })
    }else{
        return next();
    }
}