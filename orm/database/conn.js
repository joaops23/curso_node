const { Sequelize } = require("sequelize")
const sequelize = new Sequelize('nodesequelize2', 'root', '1045', {
    host: 'localhost',
    dialect: "mysql"
})

try {
    console.log("Conexão com base de dados estabelecida com sucesso!")
} catch(err) {
     console.log("Não foi possível conectar: " + err)
}

module.exports = sequelize