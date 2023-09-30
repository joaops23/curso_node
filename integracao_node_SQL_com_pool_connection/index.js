const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./database/conn.js')

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


 //preparando query antes de executar
 const query = `INSERT INTO books (??, ??) VALUES (?, ?)`;
 const data = ['title', 'pageqty', title, pageqty]

 pool.query(query, data, function(err){
    if(err){
        console.log(err)
    }

    console.log("- Inserção realizada ")
    res.redirect('/books')
 })
})

app.get('/books', (req, res) => {
    const sql = "SELECT * FROM books";

    pool.query(sql, function(err, data){
        if(err){
            console.log(err)
        }


        console.log('- resgatando todos os dados da tabela: books')
        res.render('books', {books: data})
    })
})

app.get('/books/:id', (req,res) => {
    const { id } = req.params
    const query = `SELECT * FROM books WHERE ?? = ?`
    const data = ['id', id]

    pool.query(query, data, function(err, data){
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

    pool.query(sql, function(err, data){
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

    const sql = `UPDATE books SET ?? = '?', ?? = '?' WHERE ?? = '?'`
    const data = ['title', title, 'pageqty', pageqty, 'id', id]

    pool.query(sql, data, function(err, data){
        if(err){
            console.log(err)
            return
        }

        res.redirect("/books")
    })
})

app.post("/books/remove/:id", (req,res) => {
    const id = req.params.id

    const sql = `DELETE FROM books WHERE id = ${id}`

    pool.query(sql, function(err, data) {
        if(err) {
            console.log(err)
            return
        }

        res.redirect('/books')
    })
})

app.listen(3000)