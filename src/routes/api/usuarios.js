const express = require("express");
const router = express.Router();
const usuariosApiController = require("../../controllers/api/usuariosApiController")
const validaciones = require("../../middlewares/validaciones");

router.get("/",usuariosApiController.index) 
router.get("/:id",usuariosApiController.perfilUsuario)


module.exports = router;