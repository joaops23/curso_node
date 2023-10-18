const express = require("express")
const exphbs = require('express-handlebars')

const app = express()
const conn = require("./db/conn") // instanciando conexão com banco de dados

//models



//configuração do template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.use(express.static('public'))

    const taskRoutes = require('./routes/taskRoutes')
    app.use('/tasks', taskRoutes)
    
conn.sync().then(
    app.listen(3000)
).catch((err) => console.log(err))