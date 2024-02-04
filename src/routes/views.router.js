const {Router} = require('express');
const products = require('../output/listaProductos.json')


const router = Router();

router.get('/', (req, res) => {
    res.render('home', { products });
});

router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', { products });
});

module.exports = router;