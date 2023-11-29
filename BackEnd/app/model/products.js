const connection = require('./index')
const sequelize = require('sequelize')

const products = connection.define("productsData", {
    id: {type: sequelize.DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: sequelize.DataTypes.STRING},
    imageSrc: {type: sequelize.DataTypes.TEXT},
    price: {type: sequelize.DataTypes.DOUBLE},
    stars: {type: sequelize.DataTypes.DOUBLE},
    categories: {type: sequelize.DataTypes.JSON},
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = products