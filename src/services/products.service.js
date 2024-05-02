const CustomError = require("../utils/errorHandling/customError");
const ErrorTypes = require("../utils/errorHandling/errorTypes");
const { getIdErrorInfo } = require("../utils/errorHandling/info");

class ProductsService {

    constructor(dao) {
        this.dao = dao;
    }

    async getAll() {
        return await this.dao.getAll();
    }

    async getById(id) {

        try {
            const found = await this.dao.getById(id);
            return found;
        } catch (error) {
            throw new CustomError({
                name: 'Error en la busqueda del producto',
                cause: getIdErrorInfo(id),
                message: 'Error al buscar el producto, ID inexistente o invalida',
                code: ErrorTypes.INVALID_PARAM_ERROR
            })
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