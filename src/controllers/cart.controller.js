const { cartsService, productsService } = require("../repositories");

class CartController {

    static async create (req, res) {

        try {
            await cartsService.create();
            res.send({ status: 'success' });
    
        } catch (error) {
            console.error("Error al agregar el carrito:", error);
            res.status(500).send("Error interno del servidor");
        }
    }

    static async getById (req, res) {

        const id = req.params.cid;
    
        try {
            const cart = await cartsService.getById(id);
    
            res.send(cart);
        } catch (error) {
            res.status(404).send({ error: `No existe el id ${id}`});
        }
    }

    static async getList (req, res) {

        try {
            const cart = await cartsService.getAll();
            res.send(cart);
        } catch (error) {
            res.status(404).send({ error: 'No se pudo leer el archivo'});
        }
    }

    static async addProduct (req, res) {

        try {
            const cartId = req.params.cid;
            const productId = req.params.pid;
    
            const cart = await cartsService.getById(cartId);
            const product = await productsService.getById(productId);
    
            if (product) {
                await cartsService.addProduct(cartId, productId);
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
    
            await cartsService.deleteProductById(cartId, productId);
    
            res.send({ status: 'success' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update (req, res) {

        const cartId = req.params.cid;
        const productList = req.body;
        
        if (productList) {
            const updatedProducts = await cartsService.updateCartProducts(cartId, productList);
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
            const updatedQuantity = await cartsService.updateProductQuantity(cartId, productId, newProductQuantity)
            res.send({ status: 'success', updatedQuantity});
        } else {
            res.status(404).send({ error: `Hubo un error al actualizar la cantidad del producto` });
        }
    }

    static async delete (req, res) {
        
        try {
            const cartId = req.params.cid;
    
            await cartsService.deleteAllProducts(cartId);
            res.send({ status: 'success' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    
    }

    static async purchase(req, res){
        const {id} = req.params; 

        try {
            const remainingProducts = await cartsService.purchase(id, req.user.email)
           
            res.send({status:'success', payload: remainingProducts})

        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).send({status:'error', error:error.message})
        }
    }
}

module.exports = CartController;