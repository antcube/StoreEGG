const btnComprar = document.querySelector('#btn-comprar');
const resumenContainer = document.querySelector('.cart__total');

document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carritoEGG')) || [];

    showItemsinCart(carrito);

    updateTotalPrice(carrito);

    btnComprar.addEventListener('click', () => {
        alerta('Gracias por tu compra');
        localStorage.removeItem('carritoEGG');
        resumenContainer.classList.add('d-none');
        limpiarHTML();
    })
});

function showItemsinCart(carrito) {
    const itemsContainer = document.querySelector('.cart__items');

    limpiarHTML();

    if (carrito.length === 0) {
        alerta('No hay productos en el carrito', 'error');
        resumenContainer.classList.add('d-none');
        return;
    } 

    carrito.forEach(item => {
        const itemDiv = document.createElement('DIV');
        itemDiv.classList.add('cart__item');

        const imgContainer = document.createElement('DIV');
        imgContainer.classList.add('cart__img-container');

        const img = document.createElement('img');
        img.src = item.img[0];
        img.alt = item.name;

        const descriptionDiv = document.createElement('DIV');
        descriptionDiv.classList.add('cart__description');

        const h4 = document.createElement('H4');
        h4.classList.add('cart__title');
        h4.textContent = item.name;

        const pText = document.createElement('P');
        pText.classList.add('cart__text');
        pText.textContent = item.description;

        const pColor = document.createElement('P');
        pColor.classList.add('cart__color');
        pColor.textContent = 'Color: ';

        const span = document.createElement('SPAN');
        span.textContent = item.color;
        
        const priceUnitaryDiv = document.createElement('DIV');
        priceUnitaryDiv.classList.add('cart__price-unitary');

        const pPrice = document.createElement('P');
        pPrice.textContent = 'Precio:';

        const pPriceValue = document.createElement('P');
        pPriceValue.classList.add('cart__price');
        pPriceValue.textContent = `$ ${item.price}`;

        const quantityDiv = document.createElement('DIV');
        quantityDiv.classList.add('cart__quantity');

        const pQuantity = document.createElement('P');
        pQuantity.textContent = 'Cantidad:';

        const quantityBtnsDiv = document.createElement('DIV');
        quantityBtnsDiv.classList.add('cart__quantity-btns');

        const pMinus = document.createElement('P');
        pMinus.textContent = '-';

        pMinus.addEventListener('click', () => {
            if (item.quantity > 1) {
                item.quantity--;
                input.value = item.quantity;
                item.subTotal = item.price * item.quantity;
                pSubtotalValue.textContent = `$ ${item.subTotal}`;
                updateTotalPrice(carrito);
            }
        })

        const input = document.createElement('INPUT');
        input.type = 'number';
        input.value = item.quantity;
        input.min = '1';
        input.max = '6';
        input.readOnly = true;

        const pPlus = document.createElement('P');
        pPlus.textContent = '+';

        pPlus.addEventListener('click', () => {
            if (item.quantity < 6) {
                item.quantity++;
                input.value = item.quantity;
                item.subTotal = item.price * item.quantity;
                pSubtotalValue.textContent = `$ ${item.subTotal}`;
                updateTotalPrice(carrito);
            }
        })

        quantityBtnsDiv.append(pMinus, input, pPlus);
        quantityDiv.append(pQuantity, quantityBtnsDiv);

        const priceSubtotalDiv = document.createElement('DIV');
        priceSubtotalDiv.classList.add('cart__price-subtotal');

        const divPrice = document.createElement('DIV');

        const pPriceSub = document.createElement('P');
        pPriceSub.textContent = 'Precio:';

        const pPriceSubValue = document.createElement('P');
        pPriceSubValue.classList.add('cart__price');
        pPriceSubValue.textContent = `$ ${item.price}`;

        const divSubtotal = document.createElement('DIV');

        const pSubtotal = document.createElement('P');
        pSubtotal.textContent = 'Subtotal:';

        const pSubtotalValue = document.createElement('P');
        pSubtotalValue.classList.add('cart__price--subtotal');
        pSubtotalValue.textContent = `$ ${item.subTotal}`;

        const trashDiv = document.createElement('DIV');
        trashDiv.classList.add('cart__trash');

        const imgTrash = document.createElement('IMG');
        imgTrash.src = 'img/trash.svg';
        imgTrash.alt = 'Eliminar producto';

        imgTrash.addEventListener('click', () => {
            removeItemFromCart(item.id, item.color, carrito);
        })

        // Agregando elementos al DOM
        imgContainer.appendChild(img);

        pColor.appendChild(span);
        descriptionDiv.append(h4, pText, pColor);

        priceUnitaryDiv.append(pPrice, pPriceValue);

        quantityBtnsDiv.append(pMinus, input, pPlus);
        quantityDiv.append(pQuantity, quantityBtnsDiv);

        divPrice.append(pPriceSub, pPriceSubValue);
        divSubtotal.append(pSubtotal, pSubtotalValue);
        priceSubtotalDiv.append(divPrice, divSubtotal);

        trashDiv.appendChild(imgTrash);

        itemDiv.append(imgContainer, descriptionDiv, priceUnitaryDiv, quantityDiv, priceSubtotalDiv, trashDiv);
        itemsContainer.appendChild(itemDiv);
    });
}

function updateTotalPrice(carrito) {
    const total = carrito.reduce((sum, item) => sum + item.subTotal, 0);

    const totalPriceElement = document.querySelector('.cart__price--total');
    totalPriceElement.textContent = `$ ${total}.00`;

    localStorage.setItem('carritoEGG', JSON.stringify(carrito));
}

function removeItemFromCart(id, color, carrito) {
    const carritoUpdated = carrito.filter((item) => item.id !== id || item.color !== color);

    showItemsinCart(carritoUpdated);

    updateTotalPrice(carritoUpdated);
}

function limpiarHTML() {
    const containerItems = document.querySelector('.cart__items');

    while( containerItems.firstChild ) {
        containerItems.removeChild(containerItems.firstChild);
    }
}

function alerta(mensaje, tipo) {
    const container = document.querySelector('.cart.container');
    container.classList.add('d-block');

    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alert');

    if(tipo === 'error') {
        alerta.classList.add('error');
    }

    container.insertBefore(alerta, container.firstElementChild);
    
    setTimeout(() => {
        alerta.remove();
        window.location.href = 'index.html';
    }, 3000);
}