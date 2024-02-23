const ProductModel = require("../models/product.model");

class ProductManager {

    constructor() {
        console.log('New instance of DB manager')
    }

    async addProduct(product) {
        let result = await ProductModel.create(product)
        return result;
    }

    async getProducts() {
        let products = await ProductModel.find().lean()
        return products;
    }
    
}

module.exports = ProductManager;