const {Router} = require('express');
const ProductManager = require('../dao/dbManagers/products');

const manager = new ProductManager();

const router = Router();

router.get('/', async (req, res) => {
    const products = await manager.getProducts();
    res.render('home', {
        products,
        style: 'styles.css',
        title: 'Product List'
    });
});

router.get('/realTimeProducts', async (req, res) => {
    const products = await manager.getProducts();
    res.render('realTimeProducts', {
        products,
        style: 'styles.css',
        title: 'RealTimeProducts'
    });
});

module.exports = router;