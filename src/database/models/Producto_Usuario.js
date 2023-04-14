module.exports=(sequelize,dataTypes)=>{
    const alias = "Producto_Usuario"
    const cols = {
        id : {
            type : dataTypes.INTEGER,
            autoIncrement : true,
            primaryKey:true
        },
        ID_productos : {
            type : dataTypes.INTEGER
        },
        ID_usuario : {
            type : dataTypes.INTEGER
        }
    };
    const config = {
        tableName : "productos_usuarios",
        timestamps: false
    };

    const Producto_Usuario = sequelize.define(alias,cols,config);
    



    return Producto_Usuario
}