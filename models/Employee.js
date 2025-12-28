// Constructor for employee
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/connection.js");

class Employee extends Model {


}

Employee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        manager_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "Employee",
    }
);

module.exports = Employee;
