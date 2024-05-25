export function showHeader(showForm = false) {
    const headerContent = document.querySelector('.header__contenido');

    // Crear la sección de búsqueda
    const searchDiv = document.createElement('DIV');
    searchDiv.classList.add('search');

    // Crear el logo
    const logoDiv = document.createElement('DIV');
    logoDiv.classList.add('logo');

    const logoLink = document.createElement('A');
    logoLink.href = 'index.html';

    const logoImg = document.createElement('IMG');
    logoImg.src = 'img/tiendamia-logo.svg';
    logoImg.alt = 'Logo store';

    logoLink.append(logoImg);
    logoDiv.append(logoLink);

    // Crear el formulario de búsqueda
    let formDiv;
    if(showForm) {
        formDiv = document.createElement('DIV');
        formDiv.classList.add('form');

        const form = document.createElement('FORM');
        form.addEventListener('submit', e => { e.preventDefault() });
    
        const input = document.createElement('INPUT');
        input.id = 'search';
        input.classList.add('form__input');
        input.type = 'text';
        input.placeholder = 'Search';
    
        form.append(input);
        formDiv.append(form);
    }

    // Crear la navegación social
    const socialNav = document.createElement('NAV');
    socialNav.className = 'social';

    // Crear los iconos sociales
    const socialIcons = [
        { href: '#', src: 'img/facebook.png', alt: 'icono facebook' },
        { href: '#', src: 'img/instagram.png', alt: 'icono instagram' },
        { id: 'login', src: 'img/login.svg', alt: 'icono login' }
    ];
    socialIcons.forEach(icon => {
        const iconLink = document.createElement('A');
        // iconLink.href = icon.href;
        if(icon.href) iconLink.href = icon.href;
        if (icon.id) iconLink.id = icon.id;
        iconLink.className = 'social__icon';
        const iconImg = document.createElement('IMG');
        iconImg.src = icon.src;
        iconImg.alt = icon.alt;
        if (icon.id) iconImg.className = 'icon__login';
        iconLink.append(iconImg);
        socialNav.append(iconLink);

        if(icon.id) {
            iconLink.addEventListener('click', () => {
                // const isOnline = JSON.parse(localStorage.getItem('loginEGG')) ?? false;

                // if(isOnline) {
                //     localStorage.setItem('loginEGG', JSON.stringify(false));
                //     iconImg.src = 'img/login.svg';
                //     hideIcons();
                // } else {
                //     localStorage.setItem('loginEGG', JSON.stringify(true));
                //     iconImg.src = 'img/loginCheck.svg';
                //     showIcons();
                // }

                window.location.href = 'login.html';
            })
        }
    });

    // Crear la navegación principal
    const navDiv = document.createElement('DIV');
    navDiv.className = 'nav';

    // Crear los enlaces de navegación
    const navList = document.createElement('UL');
    navList.id = 'nav';

    const navLinks = [
        { href: '#', text: 'Ofertas' },
        { href: '#', text: 'Cómo comprar' },
        { href: '#', text: 'Costos y tarifas' },
        { href: '#', text: 'Mis pedidos' },
        { href: '#', text: 'Garantía' }
    ];
    navLinks.forEach(link => {
        const listItem = document.createElement('LI');
        listItem.className = 'nav__link';
        const linkElement = document.createElement('A');
        linkElement.href = link.href;
        linkElement.textContent = link.text;
        listItem.append(linkElement);
        navList.append(listItem);
    });

    navDiv.append(navList);
    showForm ? searchDiv.append(logoDiv, formDiv, socialNav) : searchDiv.append(logoDiv, socialNav);
    headerContent.append(searchDiv, navDiv);
}

window.addEventListener('load', () => {
    const isOnline = JSON.parse(localStorage.getItem('loginEGG')) ?? false;
    const loginIcon = document.querySelector('.icon__login');

    if(isOnline) {
        loginIcon.src = 'img/loginCheck.svg';
        showIcons();
    } else {
        loginIcon.src = 'img/login.svg';
    }
});

function showIcons() {
    const socialContainer = document.querySelector('.social');

    const icons = [
        { href: 'favorite.html', src: 'img/heartSolid.svg', alt: 'icono favoritos' },
        { href: 'cart.html', src: 'img/car.svg', alt: 'icono cart' },
    ];

    icons.forEach( icon => {
        const iconLink = document.createElement('A');
        iconLink.href = icon.href;
        iconLink.className = 'social__icon';

        const iconImg = document.createElement('IMG');
        iconImg.src = icon.src;
        iconImg.alt = icon.alt;

        iconLink.append(iconImg);
        socialContainer.insertBefore(iconLink, socialContainer.lastElementChild);
    })
    
}

function hideIcons() {
    const socialContainer = document.querySelector('.social');

    while(socialContainer.children.length > 3) {
        socialContainer.removeChild(socialContainer.children[2])
    }
}