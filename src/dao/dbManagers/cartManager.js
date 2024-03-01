const CartModel = require("../models/cart.model");

class CartManager {

    async addCart() {
        const cart = {products: []}
        await CartModel.create(cart);
    }

    async getCart(id) {
        const cart = await CartModel.findOne({_id: id})
        return cart;
    }

    async addProduct(id, productId) {
        const cart = await this.getCart(id);

        const index = cart.products.findIndex(p=>p.product == productId)
        if(index >= 0){
            cart.products[index].quantity += 1;  
        }else{
            cart.products.push({product: productId, quantity:1})
        }

        await CartModel.updateOne({_id: id}, cart)
    }

    async deleteProductFromCart(cartId, productId) {
        try {
            const cart = await CartModel.findById(cartId);
    
            if (!cart) {
                throw new Error('Cart not found');
            }
    
            cart.products = cart.products.filter(p => p.product !== productId);
    
            await cart.save();
            return cart;
        } catch (error) {
            console.error(`Error al borrar el producto del carrito: ${error.message}`);
            throw error;
        }
    }
    
}

module.exports = CartManager;