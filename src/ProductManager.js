const fs = require("fs");

class ProductManager {

    constructor(path) {
        this.products = [];
        this.path = path;
        this.idCounter = 1; 

        this.initializeIdCounter();
        this.loadProductsFromFile();
    }

    loadProductsFromFile() {
        try {
            const fileContent = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(fileContent);
            console.log(`Productos cargados desde ${this.path}`);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log("No existe el archivo o aun no ha sido creado");
            } else {
                console.error("Error al cargar el archivo:", error);
            }
        }
    }

    initializeIdCounter() {
        try {
            const fileContent = fs.readFileSync(this.path, 'utf-8');
            const existingProducts = JSON.parse(fileContent);

            const maxId = existingProducts.reduce((max, product) => Math.max(max, product.id), 0);

            this.idCounter = maxId + 1;
        } catch (error) {
            console.error("Error al inicializar idCounter:", error);
        }
    }

    async addProduct(title, description, price, thumbnails, code, stock, status, category) {

        if (title && description && price && code && stock && status && category) {

            const existingProduct = this.products.find(product => product.code === code);

            if(existingProduct) {
                console.error(`Error, Producto No Agregado: El producto con el codigo "${code}" ya existe.\n`);
            } else {
                let product = {}
                product.title = title;
                product.description = description;
                product.price = price;
                product.thumbnails = thumbnails;
                product.code = code;
                product.stock = stock;
                product.status = status;
                product.category = category;
                product.id = this.idCounter;

    
                this.products.push(product)
                this.idCounter += 1;
                this.writeProductList();
                io.emit('newProduct', product);
            }
        } else {
            console.error("Error, Producto No Agregado: Se deben llenar todos los campos.\n")
        }
    }

    async writeProductList() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
    
            console.log(`Lista de productos escrita en ${this.path}`);
        } catch (error) {
            console.error("Error al escribir el archivo:", error);
        }
    }

    async getProducts() {

        try {
            const fileContent = await fs.promises.readFile(this.path, 'utf-8');
            const data = JSON.parse(fileContent);
            return data
            
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log("No existe el archivo o aun no ha sido creado");
                return null;
            } else {
                throw error;
            }
        }
    }
    
    async getProductById(id) {
        const data = await this.getProducts();
        const product = data.find(prod => prod.id == id);

        if (!product) {
            throw new Error(`El producto con la ID ${id} no existe`);
        }

        return product;
    }

    updateProduct(id, updatedValues) {
        const index = this.products.findIndex(product => product.id === id);
    
        if (index !== -1) {
            const updatedProduct = {
                ...this.products[index],
                ...updatedValues,
                id,
            };
    
            this.products[index] = updatedProduct;
    
            this.writeProductList();
    
            console.log(`El producto con la ID ${id} ha sido actualizado exitosamente.\n`);
        } else {
            console.error(`Error, no se encontro ningun producto con la ID ${id}.\n`);
        }
    }

    deleteProduct(id) {
        
        const index = this.products.findIndex(product => product.id === id);

        if (index !== -1) {
            this.products.splice(index, 1);

            this.writeProductList();

            console.log(`El producto con la ID ${id} fue eliminado exitosamente.\n`);
        } else {
            console.error(`Error, no se encontro ningun producto con la ID ${id}.\n`);
        }
    }
}

module.exports = ProductManager;