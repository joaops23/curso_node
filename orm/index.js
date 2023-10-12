const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./database/conn.js')

const User = require('./models/User')
const Address = require('./models/Address')


const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// -------- Rotas ----------------
app.get('/',  async (req, res) => {

    const users = await User.findAll({raw: true})

    console.log(users)
    
    res.render('home', {users})
})

app.get('/users/create', (req,res) => {
    res.render('addUser')
})

app.post('/users/create', async (req,res) => {
    const { name , occupation } = req.body
    let newsletter = req.body.newsletter

    if(newsletter == 'on' ){
        newsletter = true
    } else {
        newsletter = false
    }
    
    console.log(req.body)

    await User.create({name, occupation, newsletter})

    res.redirect('/')
})

app.get('/users/:id', async(req,res) => {
    const { id } = req.params

    const user = await User.findOne({raw: true, where: { id: id }})

    res.render('userView', {user})

})

app.get('/users/delete/:id', async(req, res) => {
    const { id } = req.params

    await User.destroy({where: { id: id}})

    res.redirect('/')
})

app.get('/users/edit/:id', async(req, res) => {
    const { id } = req.params

    const user = await User.findByPk(id, {raw: true})

    res.render('userEdit', {user})
})

app.post('/users/update', async(req, res) => {
    const { id, name, occupation} = req.body
    let {newsletter} = req.body

    if(newsletter){
        newsletter = true
    } else {
        newsletter = false
    }

    const userData = {
        id,
        name,
        occupation,
        newsletter: newsletter
    }
    await User.update(userData, {where: { id: id}})

    res.redirect('/')
})

app.post('/address/create', async (req,res) => {
    const {userId, street, number, city } = req.body

    const address = {
        userId,
        street,
        number,
        city
    }

    await Address.create(address);

    res.redirect(`/users/edit/${userId}`)

})

conn
.sync()
/* .sync({force: true}) */ // O atributo force faz com o que o sequelize refaça o banco de dados completo apagando e recriando as tabelas.
.then(() => { // Este método sync impede a aplicação de começar a ser executada antes que o anco de dados seja completamente criado
    app.listen(3000) // Ela verifica e se precisar cria as tabelas no banco de dados conforme os models do sistema.
}).catch((err) => console.log(err))