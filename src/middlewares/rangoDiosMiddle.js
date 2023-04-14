function rangoDios(req,res,next){
    let user = req.session.usuarioLogeado
    if(user){
        if (user.rango == 3){
            next();
        }else{
            res.render("accesoDenegado")
        }
    }else{
        res.render("accesoDenegado")
    }
}

module.exports = rangoDios