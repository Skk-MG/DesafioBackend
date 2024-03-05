const {Router} = require('express');
const ProductManager = require('../dao/dbManagers/productsManager');
const ProductModel = require('../dao/models/product.model');
const CartManager = require('../dao/dbManagers/cartManager');

const manager = new ProductManager();
const cartManager = new CartManager();

const router = Router();

router.get('/', async (req, res) => {
    const products = await manager.getProducts();
    res.render('home', {
        products,
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

router.get('/chat',(req, res)=>{
    res.render('chat',{})
})

router.get('/products',async (req, res)=>{

    let limit = req.query.limit || 10;
    let page = req.query.page || 1;
    let sort = parseInt(req.query.sort);
    let opt = {};
    let status = 'success';

    try {
        if (req.query.query){
            opt = {
                $or: [{description:req.query.query }, {category: req.query.query} ]
            }
        }

        let sortOption = {}
        if (sort) {
            sortOption = { price: sort };
        }

        let {docs, ...rest} = await ProductModel.paginate(opt, { limit: limit, page: page, sort: sortOption, lean: true });
        let products = docs;

        let nextLink = rest.hasNextPage ? `/api/products?page=${rest.nextPage}` : null
        let prevLink = rest.hasPrevPage ? `/api/products?page=${rest.prevPage}` : null

        res.render('products',{products, ...rest, nextLink, prevLink})

    } catch (error) {
        status = 'error';
        res.status(500).send({ status, error: error.message });
    }
})

router.get('/carts/:cid',async (req, res)=>{

    try {
        const cartId = req.params.cid;

        let cart = await cartManager.getCartLean(cartId);

        res.render('carts', {cart})
        
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

module.exports = router;