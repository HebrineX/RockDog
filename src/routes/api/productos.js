const express = require("express");
const router = express.Router();
const productosApiController = require("../../controllers/api/productosApiController")
const validaciones = require("../../middlewares/validaciones");

router.get("/",productosApiController.index) 
router.get("/marcas",productosApiController.marcas)
module.exports = router;