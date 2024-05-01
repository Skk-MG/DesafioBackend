const ProductManager = require('../dao/dbManagers/productsManager');
const ProductModel = require('../dao/models/product.model');
const CartManager = require('../dao/dbManagers/cartManager');
const generateProducts = require('../utils/generateProducts');
const { getIdErrorInfo } = require('../utils/errorHandling/info');
const CustomError = require('../utils/errorHandling/customError');
const ErrorTypes = require('../utils/errorHandling/errorTypes');

const manager = new ProductManager();
const cartManager = new CartManager();

class ViewsController {

    static async goHome(req, res) {
        const products = await manager.getProducts();
        res.render('home', {
            products,
            title: 'Product List'
        });
    };

    static async getRealTimeProducts(req, res) {
        const products = await manager.getProducts();
        res.render('realTimeProducts', {
            products,
            style: 'styles.css',
            title: 'RealTimeProducts'
        });
    };

    static async getChat(req, res) {
        try {
            res.render('chat',{})
        } catch (error) {
            res.status(error.status || 500).send({status: 'Error', error: error.message})
        }
    };

    static async getProducts(req, res) {

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

            const cart = await cartManager.getCartLean(req.user.cart);
    
            let nextLink = rest.hasNextPage ? `/api/products?page=${rest.nextPage}` : null
            let prevLink = rest.hasPrevPage ? `/api/products?page=${rest.prevPage}` : null
    
            res.render('products',{products, cart, ...rest, nextLink, prevLink, user: req.session.user})
    
        } catch (error) {
            status = 'error';
            res.status(500).send({ status, error: error.message });
        }
    };

    static async getCart(req, res) {

        try {
            const cartId = req.params.cid;
    
            const cart = await cartManager.getCartLean(cartId);

            if (!cart) {
                throw new CustomError({
                    name: 'Error en la busqueda del carrito',
                    cause: getIdErrorInfo(id),
                    message: 'Error al buscar el carrito, ID inexistente o invalida',
                    code: ErrorTypes.INVALID_PARAM_ERROR
                })
            }
    
            res.render('carts', cart)
            
        } catch (error) {
            next(error)
        }
    };

    static async register(req, res) {
        res.render('register', {});
    };

    static async login(req, res) {
        res.render('login');
    };

    static async resetPassword(req, res) {
        res.render('resetPassword', {});
    };

    static async mockProducts(req, res) {

        const quantity = req.query.quantity || 100;
        const products = []

        for (let i = 0; i < quantity; i++) {
            products.push(generateProducts());
        }

        res.send({ status: 'success', payload: products});
    }

}

module.exports = ViewsController;