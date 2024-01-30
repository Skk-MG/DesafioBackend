const {Router} = require('express');
const CartManager = require('../CartManager');
const ProductManager = require('../ProductManager');

const productsManager = new ProductManager(__dirname + '/../output/listaProductos.json');
const cartManager = new CartManager(__dirname + '/../output/listaCarrito.json');
const router = Router();

router.put('/:pid', async (req, res) => {

    const id = parseInt(req.params.pid);

    if (isNaN(id)) {
        return res.status(400).send('ID de producto invalida');
    }

    const updatedValues = req.body;

    try {
        await productsManager.updateProduct(id, updatedValues);
        res.send({ status: 'success' });
        
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).send("Error interno del server");
    }
});

router.delete('/:pid', async (req, res) => {
    
    const id = parseInt(req.params.pid);
    
    if (isNaN(id)) {
        return res.status(400).send('ID de producto invalida');
    }
    
    try {
        await productsManager.deleteProduct(id);
        res.send({ status: 'success' });

    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).send("Error interno del servidor");
    }
})

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

router.post('/:cid/product/:pid', async (req, res)=>{

    try {
        await cartManager.addProduct(req.params.cid, req.params.pid);
        res.send({ status: 'success' });

    } catch (error) {
        console.error("Error al agregar producto al carrito:", error);
        res.status(500).send("Error interno del servidor");
    }
})

module.exports = router;