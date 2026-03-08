const express = require('express')
const expHandlebars = require('express-handlebars')
const path = require('path')

let app = express();

app.set('views', path.join(__dirname, 'views'))

app.engine('handlebars', expHandlebars.engine())
aplicacao.set('view engine', 'handlebars')


app.get('/', (req, res) => {
    res.render('index')
})

app.listen(8000, () => {
    console.log('Inicioou o servidor')
})