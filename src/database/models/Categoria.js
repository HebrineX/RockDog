module.exports=(sequelize,dataTypes)=>{
    const alias = "Categoria"
    const cols = {
        id : {
            type : dataTypes.INTEGER,
            autoIncrement : true,
            primaryKey:true
        },
        categoria : {
            type : dataTypes.STRING
        }
    };
    const config = {
        tableName : "categorias",
        timestamps: false
    };

    const Categoria = sequelize.define(alias,cols,config);
    Categoria.associate = function(models){
        Categoria.belongsToMany(models.Producto,{
            as:'productos',
            through:"categoria_productos",
            foreignKey: "ID_categoria",
            otherKey:"ID_producto",
            timestamps: false
        })
    }
    return Categoria


}