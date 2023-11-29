const connection = require('./index')
const sequelize = require('sequelize')

const orders = connection.define("Orders", {
    Order_id: {type: sequelize.DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    first_name: {type: sequelize.DataTypes.STRING},
    last_name: {type: sequelize.DataTypes.STRING},
    email: {type: sequelize.DataTypes.STRING},
    phone_number: {type: sequelize.DataTypes.INTEGER},
    address: {type: sequelize.DataTypes.TEXT},
    country: {type: sequelize.DataTypes.STRING},
    city: {type: sequelize.DataTypes.STRING},
    zipcode: {type: sequelize.DataTypes.INTEGER}
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = orders