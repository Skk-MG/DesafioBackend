const express = require("express");
const ProductManager = require("./ProductManager");

const server = express();
const port = 8080;

server.use(express.urlencoded({extended:true}));

const manager = new ProductManager("./src/output/listaProductos.json");

server.get('/products', async (req, res) => {

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

server.get('/products/:pid', async (req, res) => {

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

server.listen(port, () => console.log(`El servidor esta corriendo en el puerto ${port}`));