// Nav
const navSelector = document.querySelector('#nav');

const options = [
    { title: "Ofertas de la semana", linkTo: "./outlet.html" },
    { title: "Titulo de a 1", linkTo: "./how.html" },
    { title: "Titulo de a 2", linkTo: "./taxs.html" },
    { title: "Titulo de a 3", linkTo: "./orders.html" },
    { title: "Titulo de a 4", linkTo: "./warranty.html" },
];

navSelector.textContent = "";

options.forEach( function(option) {
    // Destructuring de option
    const { title, linkTo } = option;

    const li = document.createElement("LI");
    li.classList.add("nav__link");

    const anchor = document.createElement("A");
    // anchor.classList.add("nav-button");
    anchor.textContent = title;
    anchor.href = linkTo;

    // Agregar elementos al DOM
    li.append(anchor);
    navSelector.append(li);
})
    
// Footer
const footerSelector = document.querySelector("#footer");

const optionsFooter = [
    { title: "Ofertas", opts: ["Laptops", "Audio", "Auticulares"]},
    { title: "Cómo comprar", opts: ["Formas de pago", "Pago2", "Pago3"] },
    { title: "Costos y tarifas", opts: ["Impuestos", "Fact"] },
    { title: "Mis pedidos", opts: ["Pedir Nu...", "Lista de.."] },
    { title: "Garantía", opts: ["Leer Gara..."] },
];

footerSelector.textContent = "";

optionsFooter.forEach( option => {
    // Destructuring de option
    const { title, opts } = option;

    const columna = document.createElement("DIV");
    columna.classList.add("col");
    
    const titulo = document.createElement("A");
    titulo.textContent = title;

    columna.append(titulo);

    opts.forEach( opt => {
        const aOpt = document.createElement("A");
        aOpt.textContent = opt;
        aOpt.href = "#";
        columna.append(aOpt);
    });
    
    footerSelector.append(columna);
})


// Cards
class Product {
    constructor(name, description, price, discount, img, linkTo) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.discount = discount;
        this.img = img;
        this.linkTo = linkTo;
    }
}

// Instancias de Product
const product1 = new Product("Producto 1", "Descripción del producto 1", 1000.00, 50, "./img/mock1.jpg", "./details.html");
const product2 = new Product("Producto 2", "Descripción del producto 2", 1000.00, 50, "./img/mock1.jpg", "./details.html");
const product3 = new Product("Producto 3", "Descripción del producto 3", 1000.00, 50, "./img/mock1.jpg", "./details.html");
const product4 = new Product("Producto 4", "Descripción del producto 4", 1000.00, 50, "./img/mock1.jpg", "./details.html");
const product5 = new Product("Producto 5", "Descripción del producto 5", 1300.00, 50, "./img/mock2.jpg", "./details.html");
const product6 = new Product("Producto 6", "Descripción del producto 6", 1300.00, 50, "./img/mock2.jpg", "./details.html");
const product7 = new Product("Producto 7", "Descripción del producto 7", 1300.00, 50, "./img/mock2.jpg", "./details.html");
const product8 = new Product("Producto 8", "Descripción del producto 8", 1300.00, 50, "./img/mock2.jpg", "./details.html");


const products = [product1, product2, product3, product4, product5, product6, product7, product8];

// Contenedor
const productContainer = document.querySelector("#products");

productContainer.textContent = "";

products.forEach( product => {
    const card = document.createElement("A");
    card.classList.add("product-card");

    const img = document.createElement("IMG");
    img.src = product.img;
    img.alt = product.name;

    const cardBody = document.createElement("DIV");
    cardBody.classList.add("product-info");

    const title = document.createElement("SPAN");
    title.classList.add("product-title");
    title.textContent = product.name;

    const description = document.createElement("SPAN");
    description.classList.add("product-description");
    description.textContent = product.description;

    const priceContainer = document.createElement("DIV");
    priceContainer.classList.add("product-price-block");

    const price = document.createElement("SPAN");
    price.classList.add("price");
    price.textContent = `$${product.price}.00`;

    const discount = document.createElement("SPAN");
    discount.classList.add("discount");
    discount.textContent = `${product.discount}% Off`;

    const policyContainer = document.createElement("DIV");
    policyContainer.classList.add("product-tax-policy");
    policyContainer.textContent = "Incluye impuesto País y percepción AFIP";

    priceContainer.append(price, discount);
    cardBody.append(title, description, priceContainer, policyContainer);
    card.append(img, cardBody);
    productContainer.append(card);
});

