const {Router} = require('express');
const ProductManager = require('../dao/dbManagers/productsManager');
const CartManager = require('../dao/dbManagers/cartManager');
const CartModel = require('../dao/models/cart.model');

const cartManager = new CartManager(__dirname + '/../files/listaCarrito.json');
const productManager = new ProductManager(__dirname + '/../files/listaProductos.json');
const router = Router();

router.post('/', async (req, res)=>{

    try {
        await cartManager.addCart();
        res.send({ status: 'success' });

    } catch (error) {
        console.error("Error al agregar el carrito:", error);
        res.status(500).send("Error interno del servidor");
    }
})

router.get('/:cid', async (req, res) => {

    const id = req.params.cid;

    try {
        const cart = await cartManager.getCart(id);
        res.send(cart);
        
    } catch (error) {
        res.status(404).send({ error: `No existe el id ${id}`});
    }
});

router.post('/:cid/product/:pid', async (req, res) => {

    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        const cart = await cartManager.getCart(cartId);
        const product = await productManager.getProductById(productId);

        if (product) {
            await cartManager.addProduct(cartId, productId);
            res.send({ status: 'success' });
        } else {
            res.status(404).send({ error: `Producto con la ID ${productId} no encontrado` });
        }
    } catch (error) {
        console.error("Error al agregar el producto al carrito:", error);
        res.status(500).send("Error Interno del Server");
    }
});

router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        const updatedCart = await cartManager.deleteProductFromCart(cartId, productId);

        res.send({ status: 'success', cart: updatedCart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:cid', async (req, res) => {
// todo
});

router.put('/:cid/products/:pid', async (req, res) => {
// todo
});

module.exports = router;
