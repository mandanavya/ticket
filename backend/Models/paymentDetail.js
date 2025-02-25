const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
 
const PaymentDetail = sequelize.define("PaymentDetail", {
    payment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    event_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    attendee_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    quantity: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    ticket_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: "payment_details",
    timestamps: false
});
 
module.exports = PaymentDetail;