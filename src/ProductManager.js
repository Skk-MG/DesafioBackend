const fs = require("fs");

class ProductManager {

    constructor(path) {
        this.products = [];
        this.idCounter = 1;
        this.path = path;
    }

    addProduct(name, desc, price, img, code, stock) {

        if (name && desc && price && img && code && stock) {

            const existingProduct = this.products.find(product => product.code === code);

            if(existingProduct) {
                console.error(`Error, Producto No Agregado: El producto con el codigo "${code}" ya existe.\n`);
            } else {
                let product = {}
                product.name = name;
                product.desc = desc;
                product.price = price;
                product.img = img;
                product.id = this.idCounter;
                product.code = code;
                product.stock = stock;
    
                this.products.push(product)
                this.idCounter += 1;
                this.writeProductList();
            }
        } else {
            console.error("Error, Producto No Agregado: Se deben llenar todos los campos.\n")
        }
    }

    writeProductList() {

        const data = JSON.stringify(this.products, null, 2);

        try {
            fs.writeFileSync(this.path, data);
            console.log(`Lista de productos escrita en ${this.path}`);
        } catch (error) {
            console.error("Error al escribir el archivo:", error);
        }
    }

    getProducts = async () => {
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
    
    getProductById = async (id) => {
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
/*
const manager = new ProductManager("./src/output/listaProductos.json");

// Agregar productos
manager.addProduct('Pava Electrica', 'una pava que hierve el agua en solo 2 minutos', 10000, "Imagen no Disponible", "abc123", 25)
manager.addProduct('Celular', 'celular de gama media', 100000, "Imagen no Disponible", "fgh456", 10)
manager.addProduct('Teclado', 'teclado QWERTY estandar', 8000, "Imagen no Disponible", "jkl789", 35)
manager.addProduct('Teclado marca X', 'teclado de la marca X', 18000, "Imagen no Disponible", "zxc101", 20)
manager.addProduct('Celular marca X', 'celular de la marca X', 58000, "Imagen no Disponible", "vbn111", 5)
manager.addProduct('Pava Electrica marca X', 'pava electrica de la marca X', 18000, "Imagen no Disponible", "mlp121", 9)
manager.addProduct('Linterna', 'linterna de hogar estandar', 5000, "Imagen no Disponible", "nko131", 50)
manager.addProduct('Linterna marca X', 'linterna de la marca X', 9500, "Imagen no Disponible", "bji141", 25)
manager.addProduct('Teclado marca Z', 'teclado de la marca Z', 13500, "Imagen no Disponible", "vhu151", 3)
manager.addProduct('Celular marca X', 'celular de la marca z', 155000, "Imagen no Disponible", "cgy161", 7)
*/
module.exports = ProductManager;