const connection = require('./index')
const sequelize = require('sequelize')

const ordersItem = connection.define("Order_item", {
    order_item_id: {type: sequelize.DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    total_price_item: {type: sequelize.DataTypes.INTEGER},
    product_id: {type: sequelize.DataTypes.INTEGER, foreignKey: true},
    quantity: {type: sequelize.DataTypes.INTEGER},
    order_id: {type: sequelize.DataTypes.INTEGER, foreignKey: true}
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = ordersItem