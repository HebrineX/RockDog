module.exports=(sequelize,dataTypes)=>{
    const alias = "Marca"
    const cols = {
        id : {
            type : dataTypes.INTEGER,
            autoIncrement : true,
            primaryKey:true
        },
        marca : {
            type : dataTypes.STRING
        }
    };
    const config = {
        tableName : "marcas",
        timestamps: false
    };

    const Marca = sequelize.define(alias,cols,config);

    Marca.associate = function(models){
        Marca.hasMany(models.Producto,{
            as:'productos',
            foreignKey: "FK_marca"
        })
    }

    return Marca


}