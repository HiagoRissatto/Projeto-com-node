const express = require('express');
const router = express.Router();
const db = require('../db');  // isso aqui vai importar a pool

// vai listar os livros

router.get('/', async (req, res, next) => {
    try{
    const[rows] = await db.query('SELECT * FROM livros');
    res.render('livros', {livros: rows});
    }catch (err){
        console.log("erro ao buscar livros")
        next(err);
    }
});

//inserir livros

router.post('/', async(req, res, next) =>{
    console.log('Dados recebidos:', req.body);
    const {titulo, autor, ano, genero, sinopse} = req.body;
    try{
        await db.execute('INSERT INTO livros (titulo, autor, ano, genero, sinopse) VALUES (?, ?, ?, ?, ?)', [titulo, autor, ano, genero, sinopse]);
        res.redirect('/livros');
    } catch(err){
        next(err);
    }
})


//para apagar livros

router.get('/deletar/:id', async (req, res, next) =>{
    const {id} = req.params;
    try{
        await db.execute('DELETE FROM livros WHERE id = ?', [id]);
        res.redirect('/livros');
    } catch (err) {
        next(err);
    }
})

// salvar estrelas
router.post('/estrelas/:id', async (req, res, next) =>{
    const { id } = req.params;
    const { estrelas } = req.body;
    try{
        await db.execute('UPDATE livros SET estrelas = ? WHERE id =?', [estrelas, id] );
        res.redirect('/livros');
    }catch (err){
        next(err);
    }
})

//salvar os status

router.post('/status/:id', async (req, res, next) =>{
    const { id } = req.params;
    const { status } = req.body;
    try{
        await db.execute('UPDATE livros SET status = ? WHERE id = ?', [status, id]);
        res.redirect('/livros');
    }catch (err){
        next(err);
    }
})
module.exports = router;
