const {Router} = require('express');
const ProductManager = require('../dao/dbManagers/productsManager');
const ProductModel = require('../dao/models/product.model');
const CartManager = require('../dao/dbManagers/cartManager');

const manager = new ProductManager();
const cartManager = new CartManager();

const router = Router();

// Middlewares
const publicAccess = (req, res, next) => {
    if(req.session.user) return res.redirect('/products')

    next();
}

const privateAccess = (req, res, next) => {
    if(!req.session.user) {
        console.log('No esta logueado')
        return res.redirect('/login')
    }

    next();
}

router.get('/', privateAccess, async (req, res) => {
    const products = await manager.getProducts();
    res.render('home', {
        products,
        title: 'Product List'
    });
});

router.get('/realTimeProducts', privateAccess, async (req, res) => {
    const products = await manager.getProducts();
    res.render('realTimeProducts', {
        products,
        style: 'styles.css',
        title: 'RealTimeProducts'
    });
});

router.get('/chat', privateAccess, (req, res)=>{
    res.render('chat',{})
})

router.get('/products', privateAccess, async (req, res)=>{

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

        res.render('products',{products, ...rest, nextLink, prevLink, user: req.session.user})

    } catch (error) {
        status = 'error';
        res.status(500).send({ status, error: error.message });
    }
})

router.get('/carts/:cid', privateAccess, async (req, res)=>{

    try {
        const cartId = req.params.cid;

        const cart = await cartManager.getCartLean(cartId);

        res.render('carts', cart)
        
    } catch (error) {
        res.send({status:'error', error: error.message})
    }
})

router.get('/register', publicAccess, (req, res) => {
    res.render('register', {});
})

router.get('/login', publicAccess, (req, res) => {
    res.render('login');
})

router.get('/resetPassword', (req, res) => {
    res.render('resetPassword', {});
})

module.exports = router;