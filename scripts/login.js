import SweetAlertFactory from "./SweetAlertFactory.js";

const sweetAlertFactory = new SweetAlertFactory();

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#loginForm');
    form.addEventListener('submit', e => {
        e.preventDefault();
        validarCredenciales();
    });

    const btnRegistro = document.querySelector('.login__register-button');
    btnRegistro.addEventListener('click', (e) => {
        e.preventDefault();
        showRegistro();
    });
});

function validarCredenciales() {
    // Obtener el correo y la contraseña ingresados por el usuario
    const correo = document.querySelector('#correo').value.trim();
    const password = document.querySelector('#password').value.trim();

    if(correo === '' || password === '') {
        // Mostrar mensaje de alerta si los campos están vacíos
        textAlert('Los campos no pueden estar vacíos');
        return;
    }

    // Validar el correo electrónico
    const regexCorreo =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if(!regexCorreo.test(correo)) {
        textAlert('Email no es válido');
        return;
    }

    // Obtener las credenciales almacenadas en localStorage
    const usuarios = getUsuarios();

    // Verificar si las credenciales coinciden
    const usuario = usuarios.find(user => user.correo === correo && user.password === password);

    if (usuario) {
        window.location.href = 'index.html';
    } else {
        textAlert('Credenciales incorrectas o usuario no registrado');        
    }
}

function textAlert(mensaje, registro = false) {
    const form = document.querySelector('#loginForm');

    const alerta = document.querySelector('.alert');

    if(!alerta) {
        const alertDiv = document.createElement('DIV');
        alertDiv.classList.add('alert', 'error');
        alertDiv.textContent = mensaje;

        if(registro) {
            form.insertBefore(alertDiv, form.children[4]);
        } else {
            form.insertBefore(alertDiv, form.children[2]);
        }

        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }

}

function showRegistro() {
    const title = document.querySelector('.login__title');
    title.textContent = 'Regístrate';

    const form = document.querySelector('#loginForm');
    limpiarHTML(form);

    const textLine = document.querySelector('.login__separator-text');
    textLine.textContent = '¿Ya tienes una cuenta?';

    const registerButton = document.querySelector('.login__register-button');
    registerButton.textContent = 'Ingresar';

    registerButton.addEventListener('click', () => window.location.reload());

    const nombreInput = document.createElement('INPUT');
    nombreInput.classList.add('login__input');
    nombreInput.id = 'nombre';
    nombreInput.type = 'text';
    nombreInput.placeholder = 'Nombre';

    const apellidoInput = document.createElement('INPUT');
    apellidoInput.classList.add('login__input');
    apellidoInput.id = 'apellido';
    apellidoInput.type = 'text';
    apellidoInput.placeholder = 'Apellido';

    const correoInput = document.createElement('INPUT');
    correoInput.classList.add('login__input');
    correoInput.id = 'correo';
    correoInput.type = 'email';
    correoInput.placeholder = 'Tu dirección de E-mail';
    correoInput.setAttribute('autocomplete', 'current-password');

    const passwordInput = document.createElement('INPUT');
    passwordInput.classList.add('login__input');
    passwordInput.id = 'password';
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Tu contraseña';
    passwordInput.setAttribute('autocomplete', 'current-password');

    const submitButton = document.createElement('BUTTON');
    submitButton.classList.add('login__button');
    submitButton.textContent = 'Registrarme';

    submitButton.addEventListener('click', e => {
        e.preventDefault();
        registrarUsuario();
    });

    form.append(nombreInput, apellidoInput, correoInput, passwordInput, submitButton);
}

function registrarUsuario() {
    const nombre = document.querySelector('#nombre').value.trim();
    const apellido = document.querySelector('#apellido').value.trim();
    const correo = document.querySelector('#correo').value.trim();
    const password = document.querySelector('#password').value.trim();

    if(nombre === '' || apellido === '' || correo === '' || password === '') {
        textAlert('Todos los campos son obligatorios', true);
        return;
    }

    const regexCorreo =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if(!regexCorreo.test(correo)) {
        textAlert('Email no es válido', true);
        return;
    }

    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!regexPassword.test(password)) {
        textAlert('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial', true);
        return;
    }

    const usuarios = getUsuarios();

    const usuario = {
        nombre,
        apellido,
        correo,
        password
    };

    const usuariosUpdate = [...usuarios, usuario];

    saveUsuarios(usuariosUpdate);

    const successAlert = sweetAlertFactory.createAlert('success', 'Usuario registrado correctamente', '¡Bienvenido!');
    successAlert.showAlert()
        .then( result => {
            if(result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }
        })
}

function getUsuarios() {
    // Obtener los usuarios almacenados en localStorage
    return JSON.parse(localStorage.getItem('usuarios')) ?? [];
}

function saveUsuarios(users) {
    localStorage.setItem('usuarios', JSON.stringify(users));
}

function limpiarHTML(contenedor) {
    while(contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}