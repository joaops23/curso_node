const  {DataTypes } = require("sequelize")

const db = require('../database/conn')

const User = require("./User")

const Address = db.define('Address', {

    street: {
        type: DataTypes.STRING,
        required: true,
    },
    number: {
        type: DataTypes.STRING,
        required: true,
    },
    city: {
        type: DataTypes.STRING,
        required: true,
    },
})

User.hasMany(Address) // usuário 1:n endereços
Address.belongsTo(User) // endereço 1:1 usuário

module.exports = Address