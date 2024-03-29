const ProductManager = require("./ProductManager");

const manager = new ProductManager("./src/output/listaProductos.json");

// Agregar productos
manager.addProduct('Pava Electrica', 'Una pava que hierve el agua en solo 2 minutos', 10000, ["Imagen no Disponible"], "abc123", 25, true, "Pava")
manager.addProduct('Celular', 'Un celular de gama media', 100000, ["Imagen no Disponible"], "fgh456", 10, true, "Celular")
manager.addProduct('Teclado', 'Un teclado QWERTY estandar', 8000, ["Imagen no Disponible"], "jkl789", 35, true, "Teclado")
manager.addProduct('Teclado marca X', 'Un teclado de la marca X', 18000, ["Imagen no Disponible"], "zxc101", 20, true, "Teclado")
manager.addProduct('Celular marca X', 'Un celular de la marca X', 58000, ["Imagen no Disponible"], "vbn111", 5, true, "Celular")
manager.addProduct('Pava Electrica marca X', 'Una pava electrica de la marca X', 18000, ["Imagen no Disponible"], "mlp121", 9, true, "Pava")
manager.addProduct('Linterna', 'Una linterna de hogar estandar', 5000, ["Imagen no Disponible"], "nko131", 50, true, "Linterna")
manager.addProduct('Linterna marca X', 'Una linterna de la marca X', 9500, ["Imagen no Disponible"], "bji141", 25, true, "Linterna")
manager.addProduct('Teclado marca Z', 'Un teclado de la marca Z', 13500, ["Imagen no Disponible"], "vhu151", 3, true, "Teclado")
manager.addProduct('Celular marca X', 'Un celular de la marca z', 155000, ["Imagen no Disponible"], "cgy161", 7, true, "Celular")


// ------> Ejemplo de un Producto con insuficientes datos
// manager.addProduct('Mouse', 'mouse estandar', 7000, "Imagen no Disponible")

// ------> Ejemplo de un Producto repetido
// manager.addProduct('Pava Electrica', 'una pava que hierve el agua en solo 2 minutos', 10000, "Imagen no Disponible", "abc123", 25)

// ------> Buscar producto a traves de su ID
// let findProductId = 2; 
// let findProduct = manager.getProductById(findProductId);

// if (findProduct) {
//     console.log("Producto encontrado:", findProduct);
// } else {
//     console.error(`Error, no existe un producto con la ID ${findProductId}.\n`);
// }


// ------> Actualizar producto usando su ID

// manager.updateProduct(2, {
//     price: 120000,
//     stock: 7,
// });

// manager.updateProduct(3, {
//     name: "Teclado marca X",
//     desc: "Teclado premium de la marca X",
//     price: 12000,
//     stock: 20,
// });

// ------> Borrar un producto a traves de su ID

// manager.deleteProduct(1);
