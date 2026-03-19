const express = require('express')
const expHandlebars = require('express-handlebars')
const path = require('path')

const livrosRoutes = require('./routes/livros')
const db = require ('./db')

let app = express();

app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', expHandlebars.engine({
    partialsDir: ['views/partials/'],
helpers: {
  formatDate: d => d ? new Date(d).toLocaleDateString('pt-BR') : ''
},
}));
app.set('view engine', 'handlebars')


app.get('/', async (req, res) => {
    try{
        const [[{ total }]] = await db.query('SELECT COUNT(*) AS total FROM livros');
        res.render('home', {total: Number(total)});
    } catch (err){
        console.log("erro na contagem", err);
    res.render('home', {total: 0});
     }
})

app.get('/cadastro', (req, res) => {
    res.render('cadastro')
})

app.use('/livros', livrosRoutes);

app.listen(8000, () => {
    console.log('Inicioou o servidor')
})