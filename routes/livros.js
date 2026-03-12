const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res, next) => {
    try{
    const[rows] = await db.query('SELECT * FROM livros');
    res.render('livros', {livros: rows});
    }catch (err){
        next(err);
    }
});

router.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

module.exports = router;
