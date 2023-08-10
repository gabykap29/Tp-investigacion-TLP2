const {sequelize, DataTypes} = require('../db')
const Images = sequelize.define('Images',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    rutaImagen:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull:false,
        defaultValue:sequelize.literal('CURRENT_TIMESTAMP')
    },
    updateAt:{
        type:DataTypes.DATE,
        allowNull:true,
    }
    ,
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }}
    ,
{
    createdAt:true,
    updatedAt:true,
    deletedAt:true,
    tableName:'images'
});
Images.sync();

module.exports = Images;