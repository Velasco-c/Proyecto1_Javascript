const validacionUsuario = (e) => {
    e.preventDefault();
    const usuarioLogueado = localStorage.getItem('usuarioLogueado'); 
    if(!usuarioLogueado){
        window.location.href = 'login.html';
    }
}

document.addEventListener('DOMContentLoaded',validacionUsuario)

