const inputBuscar = document.querySelector('#search');

// LLamada de EventListeners
// inputBuscar.onkeyup = captureText;
// inputBuscar.addEventListener('keyup', () => {
//     console.log('LLamada de evento keyup...');
// });
// inputBuscar.addEventListener('keyup', captureText);
// inputBuscar.addEventListener('keyup', event => {
//     console.log(event);
//     console.log(event.target);
// })
// inputBuscar.addEventListener('keyup', event => captureText(event))

// function captureText (event) {
//     console.log(event);
//     console.log(event.target);
//     console.log(event.target.id);
//     console.log(event.target.value);
// }



// Cards
class Product {
    constructor(id, name, description, price, discount, img, linkTo) {
        // atributos
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.discount = discount;
        this.img = img;
        this.linkTo = linkTo;
    }
}

// Instancias de Product
const product1 = new Product("P7Q8R11", "Producto1", "Descripción del producto 1", 1000.00, 50, "./img/mock1.jpg", "./details.html");
const product2 = new Product("P7Q8R12", "Producto2", "Descripción del producto 2", 1000.00, 50, "./img/mock1.jpg", "./details.html");
const product3 = new Product("P7Q8R13", "Producto3", "Descripción del producto 3", 1000.00, 50, "./img/mock1.jpg", "./details.html");
const product4 = new Product("P7Q8R14", "Producto4", "Descripción del producto 4", 1000.00, 50, "./img/mock1.jpg", "./details.html");
const product5 = new Product("P7Q8R15", "Producto5", "Descripción del producto 5", 1300.00, 50, "./img/mock2.jpg", "./details.html");
const product6 = new Product("P7Q8R16", "Producto6", "Descripción del producto 6", 1300.00, 50, "./img/mock2.jpg", "./details.html");
const product7 = new Product("P7Q8R17", "Producto7", "Descripción del producto 7", 1300.00, 50, "./img/mock2.jpg", "./details.html");
const product8 = new Product("P7Q8R18", "Producto8", "Descripción del producto 8", 1300.00, 50, "./img/mock2.jpg", "./details.html");

// Creo un array de los productos
const products = [product1, product2, product3, product4, product5, product6, product7, product8];

// Contenedor
const productContainer = document.querySelector("#products");

document.addEventListener('DOMContentLoaded', () => {
    limpiarHTML();

    mostrarProductos(products);
})

function mostrarProductos(productoArray) {
    productoArray.forEach( product => {
        const card = document.createElement("A");
        card.href = `${product.linkTo}?id=${product.id}`;
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
}

// Eventos
inputBuscar.addEventListener('keyup', event => captureText(event))

function captureText (event) {
    
    const busqueda = event.target.value;

    const productoFiltrado = products.filter( producto => {
        return producto.name === busqueda;
    });

    limpiarHTML();

    mostrarProductos(productoFiltrado);
}

function limpiarHTML() {
    while(productContainer.firstChild){
        productContainer.removeChild(productContainer.firstChild);
    }
}

// Metodo Filter
// const numeros = [1, 12, 23, 8, 5, 7, 31];
// const newArray = numeros.filter( n => n > 10)
// console.log(newArray);