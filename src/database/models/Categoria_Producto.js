module.exports=(sequelize,dataTypes)=>{
    const alias = "Categoria_Producto"
    const cols = {
        id : {
            type : dataTypes.INTEGER,
            autoIncrement : true,
            primaryKey:true
        },
        ID_producto : {
            type : dataTypes.INTEGER
        },
        ID_categoria : {
            type : dataTypes.INTEGER
        }
    };
    const config = {
        tableName : "categoria_productos",
        timestamps: false
    };

    const Producto_Usuario = sequelize.define(alias,cols,config);
    



    return Producto_Usuario
}