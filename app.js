const express = require('express')
const expHandlebars = require('express-handlebars')
const path = require('path')

let app = express();

app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', expHandlebars.engine())
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')))

app.engine("handlebars",expHandlebars.engine({
    partialsDir: ["views/partials/"]  
}));

aplicacao.set('view engine', 'handlebars')


app.get('/', (req, res) => {
    res.render('livros')
})

app.listen(8000, () => {
    console.log('Inicioou o servidor')
})