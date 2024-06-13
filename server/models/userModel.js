const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        email: {
            type: DataTypes.STRING,
            unique: true,
            isLowercase: true,
            allowNull: false,
            len: [2, 50],
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
        {
            tableName: 'users', // Explicitly specify table name if different from the model name
            timestamps: true, // Add timestamps (createdAt and updatedAt)
        });

    return User;
}