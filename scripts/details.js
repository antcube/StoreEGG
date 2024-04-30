import { products } from './data.js';

const query = location.search;
const params = new URLSearchParams(query);
const id = params.get('id');

document.addEventListener('DOMContentLoaded', () => {
    const resultado = products.find( product => product.id === id);

    mostrarProducto(resultado);

    const formulario = document.querySelectorAll('form');
    formulario.forEach( form => {
        form.addEventListener('submit', e => {
            e.preventDefault();
        });
    });
    
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
        console.log(option);
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

    const total = document.createElement('P');
    total.className = 'producto__total';
    total.textContent = 'Total';

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

    const formTop = document.createElement('DIV');
    formTop.classList.add('form__top');

    const formBottom = document.createElement('DIV');
    formBottom.classList.add('form__bottom');

    const inputNumber = document.createElement('INPUT');
    inputNumber.type = 'number';
    inputNumber.min = 1;
    inputNumber.value = 1;

    inputNumber.addEventListener('change', (e) => {
        actualizarPrecio(producto, parseInt(e.target.value));
    });

    const button = document.createElement('BUTTON');
    button.classList.add('btn-primary');
    button.textContent = 'Comprar';

    const buttonAdd = document.createElement('BUTTON');
    buttonAdd.classList.add('btn-outline');
    buttonAdd.textContent = 'Agregar al carrito';

    buttonAdd.addEventListener('click', () => {
        saveProduct(producto);
    });

    info1.append(icono1, textoEnvio);
    info2.append(icono2, textoDias);
    formTop.append(inputNumber, button);
    formBottom.append(buttonAdd);
    formCarrito.append(formTop, formBottom);
    checkoutBlock.append(total, price, taxation, info1, info2, formCarrito);
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
    const { id, name, price, img, quantity } = producto;

    const subTotal = price * quantity

    const productoAgregado = {
        id, // id: id
        name, // name: name
        subTotal, // price: price
        img, // img: img
        quantity, // quantity: quantity
        color // color: color
    }

    // Local Storage
    const carrito = JSON.parse(localStorage.getItem('carritoEGG')) ?? [];
    // Spread Operator
    localStorage.setItem('carritoEGG', JSON.stringify([...carrito, productoAgregado]));
}