const {Router} = require('express');
const ProductManager = require('../dao/dbManagers/productsManager');
const ProductModel = require('../dao/models/product.model');

const router = Router();
const manager = new ProductManager(__dirname+'/../files/listaProductos.json');

router.get('/', async (req, res) => {

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

        console.log(opt)
        console.log(req.query)
        console.log(req.query.query)


        let sortOption = {}
        if (sort) {
            sortOption = { price: sort };
        }

        let result = await ProductModel.paginate(opt, { limit: limit, page: page, sort: sortOption, lean: true });

        const paginateData = {
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}` : null,
            prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}` : null
        };

        res.send(paginateData);

    } catch (error) {
        status = 'error';
        res.status(500).send({ status, error: error.message });
    }
});

router.get('/:pid', async (req, res) => {

    const id = req.params.pid;

    try {
        const product = await manager.getProductById(id);
        res.send(product);

    } catch (error) {
        res.status(404).send({ error: `No existe el id ${id}`});
    }
});

router.post('/', async (req, res) => {

    try {
        const { title, description, price, thumbnails, code, stock, status, category } = req.body;
  
        if (!title || !description || !price || !code || !stock || !category) {
            return res.status(400).send({ error: 'Todos los campos son obligatorios.' });
        }

        const newProduct = {
            title,
            description,
            price,
            thumbnails,
            code,
            stock,
            status,
            category
        };

        const addedProduct = await manager.addProduct(newProduct);
        
        // const products = await manager.getProducts();
        // req.io.emit('list updated', {products: products});
  
        // res.send({ status: 'success'});
        res.redirect('/realTimeProducts')

    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.put('/:pid', async (req, res) => {

    const id = req.params.pid;

    const updatedValues = req.body;

    try {
        await manager.updateProduct(id, updatedValues);
        res.send({ status: 'success', updatedValues });
        
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).send("Error interno del server");
    }
});

router.delete('/:pid', async (req, res) => {
    
    const id = req.params.pid;
    
    const deletedProduct = await manager.getProductById(id);

    try {
        await manager.deleteProduct(id);
        res.send({ status: 'success', deletedProduct });

    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).send("Error interno del servidor");
    }
});

module.exports = router;