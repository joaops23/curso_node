const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')

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
app.get('/', (req, res) => {
    res.render('home')
})

app.post('/books/insertBook', (req, res) => {
 const {title, pageqty} = req.body;

 const query = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`;

 conn.query(query, function(err){
    if(err){
        console.log(err)
    }

    console.log("- Inserção realizada ")
    res.redirect('/books')
 })
})

app.get('/books', (req, res) => {
    const sql = "SELECT * FROM books";

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
        }


        console.log('- resgatando todos os dados da tabela: books')
        res.render('books', {books: data})
    })
})

app.get('/books/:id', (req,res) => {
    const { id } = req.params
    const query = `SELECT * FROM books WHERE id = ${id}`

    conn.query(query, function(err, data){
        if(err) {
            console.log(err)
            return
        }

        const book = data[0]
        res.render('book', { book }) 
    })
})

app.get('/books/edit/:id', (req, res) => {
    const { id } = req.params

    const sql = `SELECT * FROM books WHERE id = ${id}`

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }

        const book = data[0]

        res.render('editbook', {book})
    })
})

app.post('/books/updatebook', (req, res) => {
    const { id, title, pageqty } = req.body

    const sql = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE id = '${id}'`

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }

        res.redirect("/books")
    })
})

app.post("/books/remove/:id", (req,res) => {
    const id = req.params.idSS

    const sql = `DELETE FROM books WHERE id = ${id}`

    conn.query(sql, function(err, data) {
        if(err) {
            console.log(err)
            return
        }

        res.redirect('/books')
    })
})

const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '1045',
    database: 'nodemysql2',
    port:'3306'
})

conn.connect(function(err){
    if(err){
        console.log(err)
    }

    console.log("Conexão com banco de dados estabelecida!")

    app.listen(3000)
})