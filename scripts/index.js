import { products } from './data.js';
import { showHeader } from './funciones.js';

// Selectores
const productContainer = document.querySelector("#products");

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    showHeader(true);
    
    obtenerProductos();

    // mostrarProductos(products);

    busquedaInput();
});

// Funciones
async function obtenerProductos() {
    const url = './products.json';

    // Con async await
    try {
        const response = await fetch(url);
        if(!response.ok) throw new Error('Error en la petición');
        const data = await response.json();
        mostrarProductos(data.productos);
    } catch (error) {
        console.error(error);
    }
    
    // Con fetch
    // fetch(url)
    //     .then(response => {
    //         if(!response.ok) throw new Error('Error en la petición');
    //         return response.json()
    //     })
    //     .then(data => mostrarProductos(data.productos));
}

function mostrarProductos(productoArray) {
    productoArray.sort((a, b) => a.name.localeCompare(b.name));

    productoArray.forEach( product => {
        const card = document.createElement("DIV");
        card.classList.add("product-card");
    
        const link = document.createElement("A");
        link.href = `${product.linkTo}?id=${product.id}`;
        link.classList.add("product-link");

        const img = document.createElement("IMG");
        img.classList.add("product-img");
        img.src = product.img[0];
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
        price.textContent = `$ ${product.price}.00`;
    
        const discount = document.createElement("SPAN");
        discount.classList.add("discount");
        discount.textContent = `${product.discount}% Off`;
    
        const policyContainer = document.createElement("DIV");
        policyContainer.classList.add("product-tax-policy");
        policyContainer.textContent = "Incluye impuesto País y percepción AFIP";
    
        priceContainer.append(price, discount);
        cardBody.append(title, description, priceContainer, policyContainer);
        link.append(img);
        card.append(link, cardBody);
        productContainer.append(card);
    });
}

function busquedaInput() {
    const inputBuscar = document.querySelector('#search');

    inputBuscar.addEventListener('keyup', e => {
        const textoBusqueda = e.target.value.toLowerCase().trim();
        
        const productoFiltrado = products.filter( producto => {
            // return producto.name.toLowerCase() === textoBusqueda;
            return producto.name.toLowerCase().startsWith(textoBusqueda);
        });
    
        limpiarHTML();
    
        if(productoFiltrado.length) {
            mostrarProductos(productoFiltrado);
            return;
        }
        
        mostrarProductos(products);
    });
}

function limpiarHTML() {
    while(productContainer.firstChild) {
        productContainer.removeChild(productContainer.firstChild);
    }
}