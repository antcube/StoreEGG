import { showHeader } from './funciones.js';
import SweetAlertFactory from './SweetAlertFactory.js';

const sweetAlertFactory = new SweetAlertFactory();

document.addEventListener('DOMContentLoaded', () => {
    const resultado = JSON.parse(localStorage.getItem('favoritoEGG')) ?? [];

    showHeader();

    mostrarFavoritos(resultado);
})

function mostrarFavoritos(favoritos) {
    console.log(favoritos);
    const favoritesContainer = document.querySelector('.favorito__items');

    limpiarHTML();

    if (favoritos.length === 0) {
        const warningAlert = sweetAlertFactory.createAlert('warning', 'Favoritos vacío', 'No hay productos favoritos.');

        warningAlert.showAlert()
            .then( result => {
                if(result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                    window.location.href = 'index.html';
                    return;
                }
            })
    }

    favoritos.forEach(favorito => {
        // Crear el contenedor para cada item
        const favoritoItem = document.createElement('DIV');
        favoritoItem.classList.add('favorito__item');

        // Imagen del item
        const imgContainer = document.createElement('DIV');
        imgContainer.classList.add('favorito__img-container');

        const img = document.createElement('IMG');
        img.src = favorito.img[0];
        img.alt = favorito.title;

        imgContainer.append(img);

        // Descripcion del item
        const description = document.createElement('DIV');
        description.classList.add('favorito__description');

        const title = document.createElement('H4');
        title.classList.add('favorito__title');
        title.textContent = favorito.name;

        const text = document.createElement('P');
        text.classList.add('favorito__text');
        text.textContent = favorito.description;

        description.append(title, text);

        // Color del item
        const colorContainer = document.createElement('DIV');
        colorContainer.classList.add('favorito__color-container');

        const colorLabel = document.createElement('P');
        colorLabel.textContent = 'Color:';

        const color = document.createElement('P');
        color.classList.add('favorito__color');
        color.textContent = favorito.colors;

        colorContainer.append(colorLabel, color);

        // Precio del item y auxiliar color
        const priceUnitary = document.createElement('DIV');
        priceUnitary.classList.add('favorito__price-unitary');

        const colorDiv = document.createElement('DIV');
        const colorLabel2 = document.createElement('P');
        colorLabel2.textContent = 'Color:';
        const color2 = document.createElement('P');
        color2.classList.add('favorito__color');
        color2.textContent = favorito.colors;

        const priceDiv = document.createElement('DIV');
        const priceLabel = document.createElement('P');
        priceLabel.textContent = 'Precio:';
        const price = document.createElement('P');
        price.classList.add('favorito__price');
        price.textContent = `$ ${favorito.price}`;

        colorDiv.append(colorLabel2, color2);
        priceDiv.append(priceLabel, price);
        priceUnitary.append(colorDiv, priceDiv);

        // Botón para agregar al carrito
        const btnContainer = document.createElement('DIV');
        btnContainer.classList.add('favorito__btn-container');

        const btn = document.createElement('BUTTON');
        btn.classList.add('favorito__btn');
        btn.textContent = 'Agregar al Carrito';

        btnContainer.append(btn);

        btn.addEventListener('click', () => {
            saveProduct(favorito);
        })

        // Boto de eliminar
        const trash = document.createElement('DIV');
        trash.classList.add('favorito__trash');

        const trashImg = document.createElement('IMG');
        trashImg.src = 'img/trash.svg';
        trashImg.alt = 'Eliminar producto';

        trash.append(trashImg);

        trashImg.addEventListener('click', () => {
            removeItemFromFavorites(favorito.id, favorito.colors);
        });

        // Anidar elementos
        favoritoItem.append(imgContainer, description, colorContainer, priceUnitary, btnContainer, trash);
        favoritesContainer.appendChild(favoritoItem);
    });
}

function removeItemFromFavorites(id, color) {
    const questionAlert = sweetAlertFactory.createAlert('question', '¿Estás seguro de eliminar este producto de tus favoritos?',  'Una vez eliminado no podrás recuperarlo');
    
    questionAlert.showAlert()
        .then(result => {
            if(result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                const favoritos = JSON.parse(localStorage.getItem('favoritoEGG'));

                const newFavoritos = favoritos.filter(favorito => favorito.id !== id || favorito.colors !== color);

                localStorage.setItem('favoritoEGG', JSON.stringify(newFavoritos));

                mostrarFavoritos(newFavoritos);
            }
        });
}

function limpiarHTML() {
    const favoritesContainer = document.querySelector('.favorito__items');

    while(favoritesContainer.firstChild) {
        favoritesContainer.removeChild(favoritesContainer.firstChild);
    }
}

function saveProduct(producto) {
    const { id, name, description, price, img, quantity, colors } = producto;

    const subTotal = price * quantity;

    const productoAgregado = {
        id,
        name, 
        description,
        price,
        subTotal,
        img,
        quantity,
        color: colors
    }

    const carrito = JSON.parse(localStorage.getItem('carritoEGG')) ?? [];

    const indexProductoExistente = carrito.findIndex(prod => prod.id === productoAgregado.id && prod.color === productoAgregado.color);

    if(indexProductoExistente >= 0) {
        carrito[indexProductoExistente].quantity += productoAgregado.quantity;
        carrito[indexProductoExistente].subTotal = carrito[indexProductoExistente].quantity * price;

        const infoAlert = sweetAlertFactory.createAlert('info', 'El producto ya está en el carrito', 'Se ha actualizado la cantidad');

        infoAlert.showAlert()
            .then( result => {
                if(result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                    localStorage.setItem('carritoEGG', JSON.stringify(carrito));
                    window.location.href = 'cart.html';
                }
            });
    } else {
        const successAlert = sweetAlertFactory.createAlert('success', 'El producto ha sido agregado al carrito', 'Puedes verlo en el carrito');
        successAlert.showAlert()
            .then( result => {
                console.log(result);
                if(result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                    const carritoUpdate = [...carrito, productoAgregado];
                    localStorage.setItem('carritoEGG', JSON.stringify(carritoUpdate));
                    window.location.href = 'cart.html';
                }
            });
    }
}