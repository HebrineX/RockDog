module.exports = (sequelize, dataTypes)=>{
    const alias = "Producto"
    const cols = {
        id: {
            type : dataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        nombre_producto : {
            type : dataTypes.STRING
        },
        descripcion: {
            type: dataTypes.TEXT
        },
        detalle: {
            type: dataTypes.STRING
        },
        imagen: {
            type: dataTypes.TEXT
        },
        estado : {
            type: dataTypes.TINYINT(1)
        },
        precio : {
            type: dataTypes.INTEGER
        },
        stock : {
            type : dataTypes.INTEGER
        },
        FK_marca:{
            type : dataTypes.INTEGER
        }
    };
    const config = {
        tableName : "productos",
        timestamps : false
    };

    const Producto = sequelize.define(alias,cols,config);

    Producto.associate = function(models){
        Producto.belongsToMany(models.Categoria,{
            as:'categorias',
            through:"categoria_productos",
            foreignKey: "ID_producto",
            otherKey:"ID_categoria",
            timestamps: false
        })
        Producto.belongsTo(models.Marca,{
            as: "marcas",
            foreignKey: "FK_marca"
        })
        Producto.belongsToMany(models.Usuario,{
            as:'usuarios',
            through:"productos_usuarios",
            foreignKey: "ID_producto",
            otherKey:"ID_usuario",
            timestamps: false
        })
        Producto.belongsToMany(models.Compra,{
            as:'compras',
            through:"productos_compras",
            foreignKey: "ID_productos",
            otherKey:"ID_compras",
            timestamps: false
        })
    }


    return Producto

}