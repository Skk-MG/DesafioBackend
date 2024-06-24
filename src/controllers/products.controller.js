const ProductModel = require('../dao/models/product.model');
const { productsService } = require('../repositories');
const MailingService = require('../services/mailing.service');
const CustomError = require('../utils/errorHandling/customError');
const ErrorTypes = require('../utils/errorHandling/errorTypes');
const { getProductErrorInfo } = require('../utils/errorHandling/info');

const mailingService = new MailingService();

class ProductsController {

    static async getProductList(req, res) {

        let limit = req.query.limit || 10;
        let page = req.query.page || 1;
        let sort = parseInt(req.query.sort);
        let opt = {};
        let status = 'success';
    
        try {
            if (req.query.query){
                opt = {
                    $or: [{description: req.query.query }, {category: req.query.query} ]
                }
            }
    
            let sortOption = {}
            if (sort) {
                sortOption = { price: sort };
            }
    
            let result = await ProductModel.paginate(opt, { limit: limit, page: page, sort: sortOption, lean: true });
    
            const paginateData = {
                status: 'success',
                payload: result.docs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}` : null,
                prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}` : null
            };
    
            res.send(paginateData);
    
        } catch (error) {
            status = 'error';
            res.status(500).send({ status, error: error.message });
        }
    }

    static async getById(req, res, next) {

        try {
            const id = req.params.pid;

            const product = await productsService.getById(id);

            res.send(product);
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {

        try {
            const { title, description, price, thumbnails, code, stock, status, category, owner } = req.body;
      
            if (!title || !description || !price || !code || !stock || !category) {
                throw new CustomError({
                    name: 'Error en la creacion del producto',
                    cause: getProductErrorInfo({title, description, price, code, stock, category}),
                    message: 'Error al crear el producto',
                    code: ErrorTypes.INVALID_TYPE_ERROR
                })
            }
            // return res.status(400).send({ error: 'Todos los campos son obligatorios.' });
    
            const newProduct = {
                title,
                description,
                price,
                thumbnails,
                code,
                stock,
                status,
                category,
                owner
            };

            if(req.user.role == 'premium') {
                newProduct.owner = req.user.email
            }
    
            await productsService.create(newProduct);
            
            // const products = await manager.getProducts();
            // req.io.emit('list updated', {products: products});
      
            // res.send({ status: 'success'});
            req.logger.info('Producto creado con exito')

            res.redirect('/realTimeProducts')
    
        } catch (error) {
            next(error)
        }
    }

    static async update(req, res) {

        const id = req.params.pid;
    
        const updatedValues = req.body;
    
        try {
            await productsService.update(id, updatedValues);

            req.logger.info('Producto actualizado con exito')

            res.send({ status: 'success', updatedValues });
            
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            res.status(500).send("Error interno del server");
        }
    }

    static async delete(req, res) {
    
        const id = req.params.pid;
        
        try {
            const deletedProduct = await productsService.getById(id);
    
            if(req.user.role == 'premium' && deletedProduct.owner != req.user.email) {
                throw new Error('No puedes borrar ese producto')
            }

            if(deletedProduct.owner && deletedProduct.owner != "admin"){
                await mailingService.sendDeletedPremiumProductMail(deletedProduct.owner, deletedProduct.description)
            }

            await productsService.delete(id);

            res.send({ status: 'success', deletedProduct });
    
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            res.status(500).send("Error interno del servidor");
        }
    }
}

module.exports = ProductsController;