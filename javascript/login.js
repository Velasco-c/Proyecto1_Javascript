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
if (formRegistro) {
    formRegistro.addEventListener('submit', (e) => {
        e.preventDefault();
        // Aquí podrías capturar los datos con: const datos = new FormData(formRegistro);
        alert("Usuario registrado con éxito");
        formRegistro.reset(); // Limpia los campos
        modalRegistro.classList.remove('activo');
    });
}