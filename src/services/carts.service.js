const CartsDao = require("../dao/carts.dao");
const ProductsService = require("./products.service");

const productService = new ProductsService();

class CartsService {

    constructor() {
        this.dao = new CartsDao();
    }

    async getAll() {
        return await this.dao.getAll();
    }

    async getById(id) {

        const found = await this.dao.getById(id);

        if(!found) {
            return console.log("Error, carrito no encontrado");
        } else {
            return await this.dao.getById(id);
        }
    }

    async create(cart) {
        return await this.dao.create(cart);
    }

    async update(id, product) {
        const found = await this.dao.getById(id);

        if(!found) {
            return console.log("Error, producto no encontrado");
        }

        return await this.dao.update(id, product);
    }

    async delete(id) {
        const found = await this.dao.getById(id);

        if(!found) {
            return console.log("Error, producto no encontrado");
        }
        
        return await this.dao.delete(id);
    }

    async addProduct(id, productId){
        
        const cart = await this.getById(id);
        const index = cart.products.findIndex(p=>p.product._id.toString() == productId)

        console.log(cart.products)
        if(index >= 0){
            cart.products[index].quantity += 1;  
        } else{
            cart.products.push({product: productId, quantity:1})
        }

        await this.update(id, cart)

        return cart;
    }

    async deleteProductById(cartId, productId){

        const cart = await this.getById(cartId);
        await productService.getById(productId);

        const newContent = cart.products.filter(p=>p.product._id.toString() != productId)
        await this.update(cartId, {products: newContent })

        return this.getById(cartId);
    }

    async updateCartProducts(cartId, content){
        await this.getById(cartId);
        await this.update(cartId, {items: content })
        return this.getById(cartId);
    }

    async updateProductQuantity(cartId, productId, quantity){

        const cart = await this.getById(cartId);
        await productService.getById(productId)

        if(!quantity || isNaN(quantity) || quantity < 0){
            throw {message:'La cantidad no es valida', status: 400}
        }

        const productInCartIndex = cart.products.findIndex(p=>p.product._id.toString() == productId)
        if(productInCartIndex < 0){
            throw {message:`Item ${productId} does not exist in cart`, status: 400}
        }
        cart.products[productInCartIndex].quantity = parseInt(quantity);

        await this.update(cartId, cart)
        return this.getById(cartId);
    }

    async deleteAllProducts(cartId){
        await this.getById(cartId);
        await this.update(cartId, {products: [] })
        return this.getById(cartId);
    }
}

module.exports = CartsService;