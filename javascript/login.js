// --- LÓGICA DE LOGIN ---
const formularioLogin = document.getElementById('formulario-login');
const emailValido = 'admin@gmail.com';
const contraseña = 'admin123';

if (formularioLogin) {
    formularioLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (email === emailValido && password === contraseña) {
            alert('¡Inicio de sesión exitoso!');
            window.location.href = 'index.html';
        } else {
            alert('Credenciales incorrectas.');
        }
    });
}

// --- LÓGICA DEL MODAL DE REGISTRO ---
const btnAbrirRegistro = document.getElementById('btn-abrir-registro');
const btnCerrarRegistro = document.getElementById('btn-cerrar-registro');
const modalRegistro = document.getElementById('modal-registro');
const formRegistro = document.getElementById('form-registro');

// Abrir modal
if (btnAbrirRegistro) {
    btnAbrirRegistro.addEventListener('click', (e) => {
        e.preventDefault();
        modalRegistro.classList.add('activo');
    });
}

// Cerrar modal
if (btnCerrarRegistro) {
    btnCerrarRegistro.addEventListener('click', () => {
        modalRegistro.classList.remove('activo');
    });
}


// Envío de Registro

const obtenerValor = (id) => document.getElementById(id)?.value.trim();

const ingresarUsuarios = (e) => {
    e.preventDefault();
    const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = obtenerValor('username');
    const email = obtenerValor('email');
    const contra = obtenerValor('password');
    const nuevoUsuario = {
        username: usuario,
        email: email,
        contrasenia: contra
    }
    usuariosExistentes.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosExistentes));
    alert("Usuario registrado con éxito");
    formRegistro.reset();
    modalRegistro.classList.remove('activo');
}
if (formRegistro) {
    formRegistro.addEventListener('submit', ingresarUsuarios)
}


