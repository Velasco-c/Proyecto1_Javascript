document.addEventListener('DOMContentLoaded', () => {
    const textoBienvenida = document.getElementById('Bienvenido');
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado && textoBienvenida) {
        textoBienvenida.textContent = `${usuarioLogueado}`;
    }
});