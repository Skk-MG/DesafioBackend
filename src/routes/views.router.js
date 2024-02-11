const {Router} = require('express');
const ProductManager = require('../ProductManager');

const manager = new ProductManager(__dirname + '/../output/listaProductos.json');

const router = Router();

router.get('/', async (req, res) => {
    const products = await manager.getProducts();
    res.render('home', { products });
});

router.get('/realTimeProducts', async (req, res) => {
    const products = await manager.getProducts();
    res.render('realTimeProducts', { products });
});

module.exports = router;