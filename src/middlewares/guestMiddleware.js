function guestMiddleware(req,res,next){
    if (req.session.usuarioLogeado == undefined){
        next();
    }else{
        res.render("accesoDenegado")
    }
}

module.exports = guestMiddleware