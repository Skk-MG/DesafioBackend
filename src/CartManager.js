const fs = require("fs");

class CartManager {
    static id = 0; 

    constructor(path) {
        this.path = path; 
        fs.writeFileSync(path, '[]')
    }

    async addCart(){
        
        const content = await  fs.promises.readFile(this.path, 'utf-8');
        const carts = JSON.parse(content);

        const cart = {id: ++CartManager.id, products: []}

        carts.push(cart); 

        await fs.promises.writeFile(this.path, JSON.stringify(carts,null, '\t'));
    }

    async getCart(id) {

        const content = await  fs.promises.readFile(this.path, 'utf-8');
        const carts = JSON.parse(content);

        const cart = carts.find(i=>i.id == id)

        return cart; 
    }

    async addProduct(id, productId) {

        const content = await  fs.promises.readFile(this.path, 'utf-8');
        const carts = JSON.parse(content);

        const cartIndex = carts.findIndex(c => c.id == id);
        let cart = carts[cartIndex];

        let existingProductIndex = cart.products.findIndex(p => p.product == productId)
        if(existingProductIndex >= 0) {
            cart.products[existingProductIndex].quantity += 1;
        } else {
            cart.products.push({product: productId, quantity: 1});        
        }

        carts[cartIndex] = cart;

        await fs.promises.writeFile(this.path, JSON.stringify(carts,null, '\t'));
    }
    
}

module.exports = CartManager;