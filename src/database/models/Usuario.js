module.exports=(sequelize,dataTypes)=>{
    const alias = "Usuario"
    const cols = {
        id : {
            type : dataTypes.INTEGER,
            autoIncrement : true,
            primaryKey:true
        },
        nombre : {
            type : dataTypes.STRING
        },
        apellido:{
            type: dataTypes.STRING
        },
        email:{
            type: dataTypes.STRING
        },
        password:{
            type: dataTypes.STRING
        },
        rango:{
            type : dataTypes.INTEGER
        },
        estado :{
            type: dataTypes.TINYINT(1)
        },
        imagen:{
            type: dataTypes.TEXT
        }
    };
    const config = {
        tableName : "usuarios",
        timestamps: false
    };

    const Usuario = sequelize.define(alias,cols,config);

    Usuario.associate = function(models){

        Usuario.belongsToMany(models.Producto,{
            as:'producto',
            through:"productos_usuarios",
            foreignKey: "ID_usuario",
            otherKey:"ID_producto",
            timestamps: false
        })
        Usuario.hasMany(models.Compra,{
            as:'usuarios',
            foreignKey: "ID_usuario"
        })
    }

    return Usuario
}


