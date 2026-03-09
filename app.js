const express = require('express')
const expHandlebars = require('express-handlebars')
const path = require('path')

const livrosRoutes = require('./routes/livros')

let app = express();

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')))

app.engine("handlebars",expHandlebars.engine({
    partialsDir: ["views/partials/"]  
}));

app.set('view engine', 'handlebars')


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/cadastro', (req, res) => {
    res.render('cadastro')
})

app.use('/livros', livrosRoutes);

app.listen(8000, () => {
    console.log('Inicioou o servidor')
})