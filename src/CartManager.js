const fs = require("fs");

class CartManager {
    static id = 0; 

    constructor(path) {
        this.path = path; 
        fs.writeFileSync(path, '[]')
    }

    async addCart() {

        try {
            const content = await fs.promises.readFile(this.path, 'utf-8');
            const carts = JSON.parse(content);

            const cart = { id: ++CartManager.id, products: [] };

            carts.push(cart);

            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
            
        } catch (error) {
            console.error("Error al agregar carrito:", error);
        }
    }

    async getCart(id) {

        try {
            const content = await fs.promises.readFile(this.path, 'utf-8');
            const carts = JSON.parse(content);

            const cart = carts.find(i => i.id == id);

            return cart;

        } catch (error) {
            console.error("Error al recuperar el carrito:", error);
            return null;
        }
    }

    async addProduct(id, productId) {

        try {
            const content = await fs.promises.readFile(this.path, 'utf-8');
            const carts = JSON.parse(content);
    
            const cartIndex = carts.findIndex(c => c.id == id);
            let cart = carts[cartIndex];
    
            let existingProductIndex = cart.products.findIndex(p => p.product == productId);
            if (existingProductIndex >= 0) {
                cart.products[existingProductIndex].quantity += 1;
            } else {
                cart.products.push({ product: parseInt(productId), quantity: 1 });
            }
    
            carts[cartIndex] = cart;
    
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));

        } catch (error) {
            console.error("Error al agregar el producto:", error);
        }
    }
    
}

module.exports = CartManager;