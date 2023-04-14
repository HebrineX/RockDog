const express = require("express");
const router = express.Router();

const vistas = require("../controllers/vistas.js");

router.get("/", vistas.mainIndex);//todos

router.get("/pagina-en-construccion",vistas.pagEnConstruccion)

module.exports = router;