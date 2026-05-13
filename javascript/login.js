const formularioLogin = document.getElementById('formulario-login');
const emailValido = 'admin@gmail.com'; // Correo electrónico fijo para validación
const contraseña = 'admin123'; // Contraseña fija para validación
const validarLogin = (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (email === emailValido && password === contraseña) {
        alert('¡Inicio de sesión exitoso! Redirigiendo a la página principal...');
        window.location.href = 'index.html'; // Redirige a la página principal
    } else {
        alert('Correo electrónico o contraseña incorrectos. Por favor, inténtalo de nuevo.');
    }
}
formularioLogin.addEventListener('submit', validarLogin);