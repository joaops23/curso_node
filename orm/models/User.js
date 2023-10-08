const { DataTypes } = require('sequelize')
const db = require('../database/conn.js')
const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false // Não aceita valores nulos, porém vazios aceita
    },
    occupation: {
        type: DataTypes.STRING,
        required: true //Diferente do AllowNull, não aceita nem nulos nem vazios
    },
    newsletter: {
        type: DataTypes.BOOLEAN,
    }
})

module.exports = User