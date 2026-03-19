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
    formatDate: d => d ? new Date(d).toLocaleDateString('pt-BR') : '',
    estrelas: (n) => '⭐'.repeat(n || 0) + '☆'.repeat(5 - (n || 0)),
    statusBadge: (s) => {
        if (s === 'lido') return '<span class="badge bg-success">✅ Lido</span>';
        if (s === 'lendo') return '<span class="badge bg-warning text-dark">📖 Lendo</span>';
        return '<span class="badge bg-secondary">🔖 Quero Ler</span>';
    },
    eq: (a, b) => a === b,
    range: (start, end) => Array.from({ length: end - start }, (_, i) => i + start),
    estrelaSelecionada: (estrelaAtual, valor) => estrelaAtual >= valor ? '⭐' : '☆',
    statusSelected: (statusAtual, valor) => statusAtual === valor ? 'selected' : ''
},
}));
app.set('view engine', 'handlebars')


app.get('/', async (req, res) => {
    try{
        const [[{ total }]] = await db.query('SELECT COUNT(*) AS total FROM livros');
        const [ultimos] = await db.query('SELECT * FROM livros ORDER BY id DESC LIMIT 3');
        res.render('home', {total: Number(total), ultimos});
    } catch (err){
        console.log("erro na contagem", err);
    res.render('home', {total: 0, ultimos: []});
     }
})

app.get('/cadastro', (req, res) => {
    res.render('cadastro')
})

app.use('/livros', livrosRoutes);

app.listen(8000, () => {
    console.log('Inicioou o servidor')
})