# Campus Parking — Proyecto de Gestión de Parqueo

## Descripción general

Este proyecto es una aplicación web estática para la gestión de parqueos llamada **Campus Parking / Campus Land**. Permite:

- Registrar usuarios y hacer login.
- Registrar vehículos que ingresan al parqueo.
- Editar registros de vehículos activos.
- Eliminar vehículos del registro.
- Liquidar el pago del estacionamiento según tiempo de uso.
- Revisar historial de pagos y resumen de estadísticas de perfil.

La aplicación utiliza HTML, CSS y JavaScript puro, con el almacenamiento de datos en el navegador usando `localStorage`.

## Páginas principales

- `login.html`
  - Pantalla de acceso con formulario de correo y contraseña.
  - Modal de registro para crear una nueva cuenta de usuario.

- `index.html`
  - Página principal para registrar ingresos de vehículos.
  - Vista de tarifas por tipo de vehículo.
  - Secciones para agregar, modificar y liquidar vehículos.
  - Tabla de vehículos actualmente en parqueo.

- `pagos.html`
  - Historial de pagos de vehículos que ya salieron.
  - Muestra fecha/hora de ingreso, salida y total pagado.

- `perfil.html`
  - Perfil del usuario conectado.
  - Muestra nombre, correo, ganancias totales y espacios ocupados.
  - Permite editar nombre de usuario y contraseña.

## Lógica y almacenamiento

### Claves de `localStorage`

- `usuarios` — lista de usuarios registrados.
- `usuarioLogueado` — nombre del usuario que actualmente inició sesión.
- `vehiculos` — lista de vehículos activos en el parqueo.
- `vehiculoLiquidado` — historial de vehículos que ya pagaron y salieron.

### Funcionalidades clave

- `javascript/login.js`
  - Valida login con `email` y `password`.
  - Registra nuevos usuarios en el modal.

- `javascript/index.js`
  - Registra ingresos con tipo de vehículo, placa y espacio.
  - Evita duplicar plazas ocupadas o placas repetidas.
  - Permite modificar registro de placa y espacio.
  - Calcula tarifa de pago según el tiempo transcurrido.
  - Guarda datos activos y liquidaciones en `localStorage`.

- `javascript/pagos.js`
  - Carga el historial de pagos y lo muestra en tabla.
  - Formatea fechas de ingreso y salida.

- `javascript/perfil.js`
  - Muestra datos del usuario logueado.
  - Calcula ganancias acumuladas y espacios ocupados.
  - Permite actualizar usuario y contraseña.

## Estructura de carpetas

- `/` — páginas HTML principales y `README.md`.
- `/css/` — estilos globales y por página:
  - `style.css`
  - `login.css`
  - `pagos.css`
  - `perfil.css`
  - `mediaQuerys.css`
- `/javascript/` — scripts de la aplicación:
  - `index.js`
  - `login.js`
  - `pagos.js`
  - `perfil.js`
  - `ejemplos.js` (archivo auxiliar / de ejemplos)
- `/imagenes/` — recursos gráficos e iconos.

## Cómo ejecutar

1. Abrir `login.html` en el navegador.
2. Registrarse con un nuevo usuario desde el modal.
3. Iniciar sesión con ese correo y contraseña.
4. Navegar entre `index.html`, `pagos.html` y `perfil.html`.


## Recomendaciones

- Usa un navegador moderno con soporte para `localStorage`.
- Si deseas reiniciar la aplicación, elimina las claves de `localStorage` relacionadas a este proyecto.


## Estado actual

- Proyecto funcional a nivel de prototipo.
- Interfaz basada en HTML estático y JavaScript sin frameworks.

---