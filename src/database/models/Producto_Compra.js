module.exports = (sequelize, dataTypes) => {
    const alias = "Productos_Compra"
    const cols = {
        id : {
            type : dataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        ID_compras : {
            type : dataTypes.INTEGER
        },
        ID_productos : {
            type : dataTypes.INTEGER
        },
        cantidad : {
            type : dataTypes.INTEGER
        },
        precio : {
            type : dataTypes.INTEGER
        }
    }

    const config = {
        tableName : "productos_compras",
        timestamps : false
    }

    const Productos_Compra = sequelize.define(alias,cols,config);
    return Productos_Compra
}