import { showHeader } from './funciones.js';

document.addEventListener('DOMContentLoaded', () => {
    const resultado = JSON.parse(localStorage.getItem('favoritoEGG')) ?? [];

    showHeader();

    mostrarFavoritos(resultado);
})

function mostrarFavoritos(favoritos) {
    console.log(favoritos);
    const favoritesContainer = document.querySelector('.favorito__items');

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

        // Boto de eliminar
        const trash = document.createElement('DIV');
        trash.classList.add('favorito__trash');

        const trashImg = document.createElement('IMG');
        trashImg.src = 'img/trash.svg';
        trashImg.alt = 'Eliminar producto';

        trash.append(trashImg);

        // Anidar elementos
        favoritoItem.append(imgContainer, description, colorContainer, priceUnitary, btnContainer, trash);
        favoritesContainer.appendChild(favoritoItem);
    });
}