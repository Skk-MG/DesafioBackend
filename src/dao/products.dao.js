const ProductModel = require("./models/product.model");

class ProductsDao {

    async getAll() {
        return await ProductModel.find().lean();
    }

    async getById(id) {
        return await ProductModel.findOne({_id:id}).lean();
    }

    async create(product) {
        return await ProductModel.create(product)
    }

    async update(id, product) {
        return await ProductModel.updateOne({_id:id}, product)
    }

    async delete(id) {
        return await ProductModel.deleteOne({_id:id})
    }
}

module.exports = ProductsDao;