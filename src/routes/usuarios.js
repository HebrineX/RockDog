const express =require("express");
const router = express.Router();
const multerUsers = require("../middlewares/multerUsers");
const userController = require("../controllers/usuariosController.js")
const vistas =require("../controllers/vistas.js")
const rangoDiosMiddle = require("../middlewares/rangoDiosMiddle")
const guestMiddleware = require("../middlewares/guestMiddleware")
const validaciones = require("../middlewares/validaciones");
const localsGlobal = require("../middlewares/localsGlobal");






//-----------Rutas----------
router.get("/login",guestMiddleware, vistas.usuarioLogin);
router.post("/login",validaciones.login,userController.usuarioLogeo)

router.get("/cerrarSesion",userController.cerrarSession )


router.get("/registro",guestMiddleware, vistas.usuarioRegistro);
router.post("/registro", multerUsers.single("fotoPerfil") ,validaciones.registro,userController.usuarioNuevo );


router.get("/perfil/:id",vistas.perfilUsuario);

router.get("/perfiles",rangoDiosMiddle,vistas.listaUsuarios)

router.get("/editarUsuarios/:id",vistas.editarUsuario)

router.patch("/editarUsuarios/:id",multerUsers.single("fotoPerfil"),validaciones.registroEditar,userController.guardarEdiciones);

router.patch("/activar/:id",rangoDiosMiddle,userController.activarUsuario)

router.delete("/delete/:id",rangoDiosMiddle, userController.borrarUsuario)



module.exports = router