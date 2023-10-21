const { Sequelize } = require('sequelize')
const sequelize = new Sequelize("toughts", 'root', '1045', {
    host: "localhost",
    dialect: "mysql",
})

try{
    sequelize.authenticate()
    console.log("Conectado a base de dados!")
} catch(e){ console.log("Não foi possível conectar a base de dados: ", e)}

module.exports = sequelize