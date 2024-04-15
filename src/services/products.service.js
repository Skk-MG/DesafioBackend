const ProductsDao = require("../dao/products.dao");

class ProductsService {

    constructor() {
        this.dao = new ProductsDao();
    }

    async getAll() {
        return await this.dao.getAll();
    }

    async getById(id) {

        const found = await this.dao.getById(id);

        if(!found) {
            return console.log("Error, producto no encontrado");
        } else {
            return await this.dao.getById(id);
        }
    }

    async create(product) {
        return await this.dao.create(product);
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
}

module.exports = ProductsService;