const db = require("../database/models");
const sequelize = db.sequelize;

//-------------controladores----------------------------------
module.exports={
    compra : (req,res)=>{   
        res.render("compraRealizada")
    }
}