import { products } from './data.js';
import { showHeader } from './funciones.js';

const query = location.search;
const params = new URLSearchParams(query);
const id = params.get('id');


document.addEventListener('DOMContentLoaded', () => {
    showHeader();

    const resultado = products.find( product => product.id === id);

    if (resultado) {
        mostrarProducto(resultado);

        const heart = document.querySelector('.producto__total-container img');

        if (isFavorite(resultado)) {
            heart.src = 'img/heartRojo.svg';
        } else {
            heart.src = 'img/heart.svg';
        }
    } else {
        console.error('Producto no encontrado');
        window.location.href = 'index.html';
    }
});

function mostrarProducto(producto) {
    const container = document.querySelector('.main__contenido');
    // Crear los elementos
    const imagesBlock = document.createElement('DIV');
    imagesBlock.className = 'producto__images-block';

    const thumbnail = document.createElement('DIV');
    thumbnail.className = 'producto__thumbnail';
    
    const mainImage = document.createElement('DIV');
    mainImage.className = 'producto__main-image';

    producto.img.forEach((imgSrc, index) => {
        const thumbnailImage = document.createElement('IMG');
        thumbnailImage.src = imgSrc;
        thumbnailImage.alt = producto.name;

        thumbnail.append(thumbnailImage);
    
        thumbnailImage.addEventListener('click', () => {
            mainImage.querySelector('img').src = thumbnailImage.src;
        });
    
        if (index === 0) {
            const mainImageElement = document.createElement('IMG');
            mainImageElement.src = imgSrc;
            mainImageElement.alt = producto.name;

            mainImage.append(mainImageElement);
        }
    });

    imagesBlock.append(thumbnail, mainImage);
    

    const descriptionBlock = document.createElement('DIV');
    descriptionBlock.className = 'producto__description-block';

    const heading = document.createElement('H3');
    heading.className = 'producto__heading';
    heading.textContent = producto.name;

    const form = document.createElement('FORM');
    form.className = 'selector';
    form.addEventListener('submit', (e) => { e.preventDefault() });

    const label = document.createElement('LABEL');
    label.className = 'selector__label';
    label.for = 'color';
    label.textContent = 'Color:';

    const select = document.createElement('SELECT');
    select.className = 'selector__select';
    select.id = 'color';

    // const defaultOption = document.createElement('OPTION');
    // defaultOption.textContent = '-- Seleccionar --';
    // defaultOption.selected = true;
    // defaultOption.disabled = true;

    // select.append(defaultOption);

    producto.colors.forEach(color => {
        const option = document.createElement('OPTION');
        option.value = color;
        option.textContent = color;
        select.append(option);
    });

    const description = document.createElement('DIV');
    description.className = 'producto__description';

    const descriptionTitle = document.createElement('H5');
    descriptionTitle.className = 'producto__description-title';
    descriptionTitle.textContent = 'Descripción:';

    const descriptionText = document.createElement('P');
    descriptionText.className = 'producto__description-text';
    descriptionText.textContent = producto.description;

    form.append(label, select);
    description.append(descriptionTitle, descriptionText);
    descriptionBlock.append(heading, form, description);

    const checkoutBlock = document.createElement('DIV');
    checkoutBlock.className = 'producto__checkout-block';

    const totalContainer = document.createElement('DIV');
    totalContainer.classList.add('producto__total-container');

    const total = document.createElement('P');
    total.className = 'producto__total';
    total.textContent = 'Total';

    const heart = document.createElement('IMG');
    heart.src = 'img/heart.svg';
    heart.alt = 'favorito';
    heart.classList.add('producto__heart');

    heart.addEventListener('click', () => {
        if (isFavorite(producto)) {
            heart.src = 'img/heart.svg';
            removeFavorite(producto);
        } else {
            heart.src = 'img/heartRojo.svg';
            addFavorite(producto, true);
        }
        // heart.src = 'img/heartRojo.svg';
        // setTimeout(() => {
        //     addFavorite(producto);
        // }, 2000);
    })

    totalContainer.append(total, heart);

    const price = document.createElement('P');
    price.className = 'producto__price';
    price.textContent = `$ ${producto.price}.00`;

    const taxation = document.createElement('P');
    taxation.className = 'producto__taxation';
    taxation.textContent = 'Incluye impuestos PAIS y percepción AFIP. Podés recuperar $500 haciendo la solicitud en AFIP.';

    const info1 = document.createElement('DIV');
    info1.className = 'producto__info';

    const info2 = document.createElement('DIV');
    info2.className = 'producto__info';

    const icono1 = document.createElement('IMG');
    icono1.src = 'img/truck.png';
    icono1.alt = 'Icono de camión';

    const icono2 = document.createElement('IMG');
    icono2.src = 'img/plane.png';
    icono2.alt = 'Icono de avion';

    const textoEnvio = document.createElement('P');
    textoEnvio.textContent = 'Agrega el producto al carrito para conocer los costos de envío';

    const textoDias = document.createElement('P');
    textoDias.textContent = 'Recibí aproximadamente entre 10 y 15 días hábiles, seleccionando envío normal';

    const formCarrito = document.createElement('FORM');
    formCarrito.classList.add('producto__form-group');
    formCarrito.addEventListener('submit', (e) => { e.preventDefault() });

    const formTop = document.createElement('DIV');
    formTop.classList.add('form__top');

    // const formBottom = document.createElement('DIV');
    // formBottom.classList.add('form__bottom');

    const selectNumber = document.createElement('SELECT');
    
    for (let i = 1; i <= 6; i++) {
        const option = document.createElement('OPTION');
        option.value = i;
        option.text = i;
        selectNumber.appendChild(option);
    }

    producto.quantity = 1;

    selectNumber.addEventListener('change', (e) => {
        let cantidad = parseInt(e.target.value);

        if(isNaN(cantidad) || cantidad < 1 || !Number.isInteger(cantidad)) {
            console.error('El valor seleccionado no es válido. Se establecerá la cantidad en 1.');
            e.target.value = 1;
            cantidad = 1;
            actualizarPrecio(producto, cantidad);
            return;
        }

        actualizarPrecio(producto, cantidad);
    });

    // const button = document.createElement('BUTTON');
    // button.classList.add('btn-primary');
    // button.textContent = 'Comprar';

    const buttonAdd = document.createElement('BUTTON');
    buttonAdd.classList.add('btn-outline');
    buttonAdd.textContent = 'Agregar al carrito';

    buttonAdd.addEventListener('click', () => {
        saveProduct(producto);

        window.location.href = 'cart.html';
    });

    info1.append(icono1, textoEnvio);
    info2.append(icono2, textoDias);
    formTop.append(selectNumber, buttonAdd);
    // formBottom.append(buttonAdd);
    formCarrito.append(formTop);
    checkoutBlock.append(totalContainer, price, taxation, info1, info2, formCarrito);
    container.append(imagesBlock, descriptionBlock, checkoutBlock);
}

function actualizarPrecio(producto, cantidad) {
    const precio = document.querySelector('.producto__price');
    precio.textContent = `$ ${producto.price * cantidad}.00`;

    producto.quantity = cantidad;
}

function saveProduct(producto) {
    const color = document.querySelector('#color').value;

    // Destructuring del objeto producto
    const { id, name, description, price, img, quantity } = producto;

    const subTotal = price * quantity;

    const productoAgregado = {
        id, // id: id
        name, // name: name
        description, // description: description
        price, // price: price
        subTotal, // subtotal: subtotal
        img, // img: img
        quantity, // quantity: quantity
        color // color: color
    }

    // Local Storage
    const carrito = JSON.parse(localStorage.getItem('carritoEGG')) ?? [];

    const indexProductoExistente = carrito.findIndex(prod => prod.id === productoAgregado.id && prod.color === productoAgregado.color);

    if(indexProductoExistente >= 0) {
        carrito[indexProductoExistente].quantity += productoAgregado.quantity;
        carrito[indexProductoExistente].subTotal = carrito[indexProductoExistente].quantity * price;
    } else {
        // carrito = [...carrito, productoAgregado]; // Cambiar a let carrito si se usa esta línea
        carrito.push(productoAgregado);
    }
    
    localStorage.setItem('carritoEGG', JSON.stringify(carrito));
}

function addFavorite(producto, unidad = false) {
    const favoritos = JSON.parse(localStorage.getItem('favoritoEGG')) ?? [];

    if(unidad) {
        const productoFavorito = {
            ...producto,  // Spread Operator
            quantity: 1
        }
        
        favoritos.push(productoFavorito);
    } else {
        // const color = document.querySelector('#color').value;

        const productoFavorito = {
            ...producto,  // Spread Operator
        }

        // Local Storage
        const indexFavoritoExistente = favoritos.findIndex(item => item.id === productoFavorito.id);

        if(indexFavoritoExistente >= 0) {
            console.log('Si existe en Favoritos');
        } else {
            favoritos.push(productoFavorito);
        }
    }

    localStorage.setItem('favoritoEGG', JSON.stringify(favoritos));
}

function isFavorite(producto) {
    const favoritos = JSON.parse(localStorage.getItem('favoritoEGG')) || [];
    return favoritos.some(fav => fav.id === producto.id);
}

function removeFavorite(producto) {
    const favoritos = JSON.parse(localStorage.getItem('favoritoEGG')) || [];
    const favoritosUpdate = favoritos.filter(fav => fav.id !== producto.id);
    localStorage.setItem('favoritoEGG', JSON.stringify(favoritosUpdate));
}