const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()
const conn = require('./database/conn')

//models 
const Tought = require("./models/Tought")
const User = require("./models/User")

//Routes
const toughtRoutes = require("./routes/toughtRoutes")
const authRoutes = require("./routes/authRoutes")

// Controllers
const ToughtController = require('./controllers/ToughtController')

//template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//receber body da requisição
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//session middleware
app.use(
    session({
        name: 'session',
        secret: "chave",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require("os").tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true //rodará sem certificado https
        }
    })
)


//flash messages
app.use(flash())

//public path
app.use(express.static('public'))

app.use((req, res, next) => {
    if(req.session.userId) {
        res.locals.session = req.session // caso exista, envia a sessão na resposta da requisição
    }

    next()
})

//Toughts
app.use("/toughts", toughtRoutes)
app.use("/", authRoutes)
//set session to res

//rota padrão 
app.get('/', ToughtController.showToughts)

conn
    /* .sync({force: true}) */
    .sync()
    .then(() => {
        app.listen(3000)
        console.log("Servidor rodando na porta 3000")
    })
    .catch((err) => console.log(err))