const {Router} = require('express');
const ProductManager = require('../ProductManager');

const router = Router();
const manager = new ProductManager(__dirname + '/../output/listaProductos.json');

router.get('/', async (req, res) => {

    try {
        let products = await manager.getProducts();
    
        const { desc, limit } = req.query;
    
        if (desc) {
            const lowercaseDesc = desc.toLowerCase();
            products = products.filter(p => p.desc.toLowerCase().includes(lowercaseDesc));
        }
    
        const limitValue = parseInt(limit);
        
        if (!isNaN(limitValue) && limitValue > 0) {
            products = products.slice(0, limitValue);
        }
    
        res.send(products);
        
    } catch (error) {
        console.error("Error al retirar los productos:", error);
        res.status(500).send("Error interno del server");
    }
});

router.get('/:pid', async (req, res) => {

    const id = parseInt(req.params.pid);

    if (isNaN(id)) {
        return res.status(400).send('ID de producto invalida');
    }

    try {
        const product = await manager.getProductById(id);
        res.send(product);

    } catch (error) {
        res.status(404).send({ error: `No existe el id ${id}`});
    }
});

router.post('/', async (req, res) => {

    try {
        const { name, desc, price, thumbnail, code, stock, status, category } = req.body;
  
        if (!name || !desc || !price || !thumbnail || !code || !stock || !status || !category) {
            return res.status(400).send({ error: 'Todos los campos son obligatorios.' });
        }

        const newProduct = await manager.addProduct(name, desc, price, thumbnail, code, stock, status, category);
  
        res.send({ status: 'success', payload: newProduct });

    } catch (error) {
        res.status(400).send({ error: error.message });
    }
  });

module.exports = router;