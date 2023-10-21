const { DataTypes } = require("sequelize")
const db = require("../database/conn")
const Tought = require("./Tought")

const User = db.define("User", {
    name: {
        type: DataTypes.STRING,
        require: true
    },
    email: {
        type: DataTypes.STRING,
        require: true
    },
    password: {
        type: DataTypes.STRING,
        require: true
    },
})


module.exports = User