const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodemvc2', 'root', '1045', {
    host: "localhost",
    dialect: "mysql"
})

try{
    sequelize.authenticate()
    console.log("Conectado ao banco de dados")

}catch(err){
    console.error(`Não foi possível conectar com banco: ${err}`)
}

module.exports = sequelize