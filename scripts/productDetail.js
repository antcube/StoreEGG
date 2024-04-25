const query = location.search;
const params = new URLSearchParams(query);
const id = params.get('id');

// const resultado = products.find( function(product) {
//     return product.id === id;
// });
const resultado = products.find( product => product.id === id);

mostrarProducto(resultado);

function mostrarProducto(producto) {
    // Destructuring del producto
    const { name, description, price, img } = producto;

    // Crear el HTML

    // imagenes
    const imgSecundarias = document.querySelector('#imagesSmall');

    const miniatura1 = document.createElement('IMG');
    miniatura1.src = img;
    miniatura1.alt = name;

    const miniatura2 = document.createElement('IMG');
    miniatura2.src = img;
    miniatura2.alt = name;

    const imgPrincipal = document.querySelector('#imageMain');

    const imagen = document.createElement('IMG');
    imagen.src = img;
    imagen.alt = name;

    // descripcion
    const divDescription = document.querySelector('#descripcion-bloque');

    const title = document.createElement('H3');
    title.textContent = name;
    title.classList.add('producto__heading');

    const formulario = document.createElement('FORM');
    formulario.classList.add('selector');

    const label = document.createElement('LABEL');
    label.classList.add('selector__label');
    label.for = 'color';
    label.textContent = 'Color:';

    const select = document.createElement('SELECT');

    imgSecundarias.append(miniatura1, miniatura2);
    imgPrincipal.append(imagen);
}