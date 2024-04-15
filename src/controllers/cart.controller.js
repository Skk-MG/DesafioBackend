const CartsService = require("../services/carts.service");
const ProductsService = require("../services/products.service");


const cartService = new CartsService();
const productService = new ProductsService();


class CartController {

    static async create (req, res) {

        try {
            await cartService.create();
            res.send({ status: 'success' });
    
        } catch (error) {
            console.error("Error al agregar el carrito:", error);
            res.status(500).send("Error interno del servidor");
        }
    }

    static async getById (req, res) {

        const id = req.params.cid;
    
        try {
            const cart = await cartService.getById(id);
    
            res.send(cart);
        } catch (error) {
            res.status(404).send({ error: `No existe el id ${id}`});
        }
    }

    static async getList (req, res) {

        try {
            const cart = await cartService.getAll();
            res.send(cart);
        } catch (error) {
            res.status(404).send({ error: 'No se pudo leer el archivo'});
        }
    }

    static async addProduct (req, res) {

        try {
            const cartId = req.params.cid;
            const productId = req.params.pid;
    
            const cart = await cartService.getById(cartId);
            const product = await productService.getById(productId);
    
            if (product) {
                await cartService.addProduct(cartId, productId);
                res.send({ status: 'success' });
            } else {
                res.status(404).send({ error: `Producto con la ID ${productId} no encontrado` });
            }
        } catch (error) {
            console.error("Error al agregar el producto al carrito:", error);
            res.status(500).send("Error Interno del Server");
        }
    }

    static async deleteProduct (req, res) {

        try {
            const cartId = req.params.cid;
            const productId = req.params.pid;
    
            await cartService.deleteProductById(cartId, productId);
    
            res.send({ status: 'success' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update (req, res) {

        const cartId = req.params.cid;
        const productList = req.body;
        
        if (productList) {
            const updatedProducts = await cartService.update(cartId, productList);
            res.send({ status: 'success', updatedProducts});
        } else {
            res.status(404).send({ error: `Carrito con la ID ${cartId} no encontrado` });
        }
    }

    static async updateProductQuantity (req, res) {

        const cartId = req.params.cid;
        const productId = req.params.pid;
        const newProductQuantity = req.body.quantity;
    
        if (newProductQuantity) {
            const updatedQuantity = await cartService.updateProductQuantity(cartId, productId, newProductQuantity)
            res.send({ status: 'success', updatedQuantity});
        } else {
            res.status(404).send({ error: `Hubo un error al actualizar la cantidad del producto` });
        }
    }

    static async delete (req, res) {
        
        try {
            const cartId = req.params.cid;
    
            await cartService.deleteAllProducts(cartId);
            res.send({ status: 'success' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    
    }
}

module.exports = CartController;