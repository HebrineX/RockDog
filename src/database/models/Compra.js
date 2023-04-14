module.exports=(sequelize,dataTypes)=>{
    const alias = "Compra"
    const cols = {
        id : {
            type : dataTypes.INTEGER,
            autoIncrement : true,
            primaryKey:true
        },
        total :{
            type : dataTypes.INTEGER
        },
        direccion_envio : {
            type : dataTypes.STRING
        }
    };
    const config = {
        tableName : "compras",
        timestamps: false
    };

    const Compra = sequelize.define(alias,cols,config);
    
    Compra.associate = function(models){

        Compra.belongsToMany(models.Producto,{
            as:'productos',
            through:"productos_compras",
            foreignKey: "ID_compras",
            otherKey:"ID_productos",
            timestamps: false
        })
        
        Compra.belongsTo(models.Usuario,{
            as: "usuarios",
            foreignKey: "ID_usuario"
        })
    }

    return Compra
}