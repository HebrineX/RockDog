const express = require("express");
const router = express.Router();
const multerProd = require("../middlewares/multerProd");
const comprasController = require("../controllers/comprasController.js")
const prodController = require("../controllers/productosController.js")
const vistas = require("../controllers/vistas");
const validaciones = require("../middlewares/validaciones")





router.get("/", vistas.prodIndex); // todos

router.get("/descontinuados", vistas.deBaja); //vendedores y administradores

router.get("/details/:id", vistas.detalleProd);// todos

router.get("/buscar", vistas.buscar);

router.get("/carrito", vistas.carrito);// todos

router.get("/compra-realizada",comprasController.compra) 

router.get("/crear-producto", vistas.crearProducto);// vendedores y administradores

router.post("/crear-producto", multerProd.single("imagenProducto"),validaciones.producto, prodController.guardarProducto)// vendedores y administradores

router.get("/editar-producto/:id", vistas.editarProducto)// vendedores y administradores

router.patch("/editar-producto/:id", multerProd.single("imagenProducto"),validaciones.productoEditar , prodController.guardarEdiciones)// vendedores y administradores

router.patch("/activar/:id",prodController.activarProducto)

router.delete("/delete/:id", prodController.borrarProducto)// vendedores y administradores

module.exports = router;