const {Router} = require('express');
const CartManager = require('../CartManager');
const ProductManager = require('../ProductManager');

const cartManager = new CartManager(__dirname + '/../output/listaCarrito.json');
const productManager = new ProductManager(__dirname + '/../output/listaProductos.json');
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

    const id = parseInt(req.params.cid);

    if (isNaN(id)) {
        return res.status(400).send('ID de producto invalida');
    }

    try {
        const cart = await cartManager.getCart(id);
        res.send(cart);
        
    } catch (error) {
        res.status(404).send({ error: `No existe el id ${id}`});
    }
});

router.post('/:cid/product/:pid', async (req, res) => {

    try {

        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);

        if (isNaN(cartId) || isNaN(productId)) {
            return res.status(400).send('ID de producto o carrito invalido(s)');
        }

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

module.exports = router;