import { showHeader } from "./funciones.js";
import SweetAlertFactory from "./SweetAlertFactory.js";

const btnComprar = document.querySelector('#btn-comprar');
const resumenContainer = document.querySelector('.cart__total');
const sweetAlertFactory = new SweetAlertFactory();

document.addEventListener('DOMContentLoaded', () => {
    showHeader();

    const carrito = JSON.parse(localStorage.getItem('carritoEGG')) || [];

    showItemsinCart(carrito);

    updateTotalPrice(carrito);

    btnComprar.addEventListener('click', () => {
        const successAlert = sweetAlertFactory.createAlert('success', 'Gracias por tu compra!', 'Tu pedido ha sido realizado con éxito.');

        successAlert.showAlert()
            .then( result => {
                if(result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                    localStorage.removeItem('carritoEGG');
                    resumenContainer.classList.add('d-none');
                    limpiarHTML();
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 500);
                }
            });
    })
});

function showItemsinCart(carrito) {
    const itemsContainer = document.querySelector('.cart__items');

    limpiarHTML();

    if (carrito.length === 0) {
        resumenContainer.classList.add('d-none');

        const warningAlert = sweetAlertFactory.createAlert('warning', 'Carrito vacío', 'No hay productos en el carrito.');

        warningAlert.showAlert()
            .then( result => {
                if(result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                    window.location.href = 'index.html';
                    return;
                }
            })
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
    
    const questionAlert = sweetAlertFactory.createAlert('question', '¿Estás seguro?', '¿Deseas eliminar este producto del carrito?');

    questionAlert.showAlert()
        .then( result => {
            if(result.isConfirmed) {
                const successAlert = sweetAlertFactory.createAlert('success', 'Producto eliminado!', 'El producto ha sido eliminado del carrito.');

                successAlert.showAlert()
                    .then( result => {
                        if(result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                            const carritoUpdated = carrito.filter((item) => item.id !== id || item.color !== color);
                            showItemsinCart(carritoUpdated);
                            updateTotalPrice(carritoUpdated);
                        }
                    })
            }
        })
}

function limpiarHTML() {
    const containerItems = document.querySelector('.cart__items');

    while( containerItems.firstChild ) {
        containerItems.removeChild(containerItems.firstChild);
    }
}