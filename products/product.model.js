const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        product_name: { type: DataTypes.STRING, allowNull: false },
        product_uom: { type: DataTypes.STRING, allowNull: false },
        product_price: { type: DataTypes.STRING, allowNull: false },
    };

    return sequelize.define('Product', attributes);
}