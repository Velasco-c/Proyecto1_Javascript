const validacionUsuario = (e) => {
    e.preventDefault();
    const usuarioLogueado = localStorage.getItem('usuarioLogueado'); 
    if(!usuarioLogueado){
        window.location.href = 'login.html';
    }
}

document.addEventListener('DOMContentLoaded',validacionUsuario)
const btnCerrar = document.getElementById('cerrarSesion');

if (btnCerrar) {
    btnCerrar.addEventListener('click', (e) => {
        console.log('funcionando')
        e.preventDefault(); 
        localStorage.removeItem('usuarioLogueado'); 
        window.location.href = "login.html"; 
    });
}
