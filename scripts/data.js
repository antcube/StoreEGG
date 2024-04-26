import Product from "./Product.js";

// Instancias de Product
const product1 = new Product("P7Q8R11", "Producto1", "Descripción del producto 1", 1000.00, 50, ["./img/mock1.jpg", "./img/mock2.jpg", "./img/mock1.jpg"], "./details.html");
const product2 = new Product("P7Q8R12", "Producto2", "Descripción del producto 2", 1000.00, 50, ["./img/mock1.jpg", "./img/mock1.jpg", "./img/mock1.jpg"], "./details.html");
const product3 = new Product("P7Q8R13", "Producto3", "Descripción del producto 3", 1000.00, 50, ["./img/mock1.jpg", "./img/mock1.jpg", "./img/mock1.jpg"], "./details.html");
const product4 = new Product("P7Q8R14", "Producto4", "Descripción del producto 4", 1000.00, 50, ["./img/mock1.jpg", "./img/mock1.jpg", "./img/mock1.jpg"], "./details.html");
const product5 = new Product("P7Q8R15", "Producto5", "Descripción del producto 5", 1300.00, 50, ["./img/mock2.jpg", "./img/mock2.jpg", "./img/mock2.jpg"], "./details.html");
const product6 = new Product("P7Q8R16", "Producto6", "Descripción del producto 6", 1300.00, 50, ["./img/mock2.jpg", "./img/mock2.jpg", "./img/mock2.jpg"], "./details.html");
const product7 = new Product("P7Q8R17", "Producto7", "Descripción del producto 7", 1300.00, 50, ["./img/mock2.jpg", "./img/mock2.jpg", "./img/mock2.jpg"], "./details.html");
const product8 = new Product("P7Q8R18", "Producto8", "Descripción del producto 8", 1300.00, 50, ["./img/mock2.jpg", "./img/mock2.jpg", "./img/mock2.jpg"], "./details.html");

export const products = [product1, product2, product3, product4, product5, product6, product7, product8];