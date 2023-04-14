//------------- Requerimientos de "base de datos jsons"-------
const db = require("../database/models");
const sequelize = db.sequelize;
const Op = sequelize.OP



//------------- punto. MIL -----------------------------------
const divisorNumerico = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const vistasController = {
    //-----------------vistas index-------------------
    mainIndex: (req, res) => {
        db.Categoria.findAll({ include: [{ association: "productos" }] })
            .then(categorias => {
                return res.render("index", { categorias, divisorNumerico })
            })

    },
    prodIndex: (req, res) => {
        db.Categoria.findAll({ include: [{ association: "productos" }] })
            .then(categorias => {
                return res.render("indexProductos", { categorias, divisorNumerico })
            })
    },


    // ---------------Vistas Productos--------

    detalleProd: (req, res) => {
        let id = req.params.id;
        db.Producto.findByPk(id, { include: [{ association: 'marcas', }, { association: 'categorias' }] })
            .then(product => {

                return res.render("productoBase", { product, divisorNumerico })
            })

    },
    editarProducto: (req, res) => {
        console.log(req);
        let id = req.params.id
        let Product = db.Producto.findByPk(id, { include: [{ association: 'marcas' }, { association: 'categorias' }] })
        let Marca = db.Marca.findAll()
        let Categoria = db.Categoria.findAll()
        Promise.all([Product, Marca, Categoria])
            .then(([product, marca, categoria]) => {


                return res.render("editarProducto", { product, marca, categoria });
            })
    },
    carrito: (req, res) => {
        return res.render("carrito");
    },
    crearProducto: (req, res) => {
        let Marca = db.Marca.findAll()
        let Categoria = db.Categoria.findAll()
        Promise.all([Marca, Categoria])
            .then(([marca, categoria]) => {
                return res.render("crearProducto", { marca, categoria });
            })
    },
    deBaja: (req, res) => {
        db.Categoria.findAll({ include: [{ association: "productos" }] })
            .then(categorias => {
                return res.render("productosDescontinuados", { categorias, divisorNumerico })
            })
    },


    buscar: (req, res) => {
        //   let laBusqueda = req.query.buscar;
        //   db.Producto.findAll({where:{
        //       nombre_producto :{[db.Sequelize.Op.like]: "%"+laBusqueda+"%"}
        //   }})
        //   .then((loBuscado)=>{
        //       console.log(loBuscado)
        //       res.render("Busqueda",loBuscado)
        //   
        //   })
    },

    //------------Vistas Usuarios-----------





    usuarioLogin: (req, res) => {

        return res.render("login")
    },
    usuarioRegistro: (req, res) => {
        return res.render("registro")
    },

    perfilUsuario: (req, res) => {
        let id = req.params.id;

        db.Usuario.findByPk(id)
            .then(usuarios => {
                return res.render("perfilUsuario", {
                    usuarios
                })
            })

    },
    listaUsuarios: (req, res) => {
        db.Usuario.findAll()
            .then(users => {
                res.render("listaUsuarios", {
                    users
                })
            })

    },

    editarUsuario: (req, res) => {
        let id = req.params.id;
        db.Usuario.findByPk(id)
            .then(user => {
                return res.render("editarUsuarios", {
                    user
                })
            }
            )

    },
    pagEnConstruccion: (req, res) => {
        return res.render("pagEnConstruccion")
    }

}

module.exports = vistasController