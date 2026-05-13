# TechNova Solutions - Aurum Motors

## Funciones JS que conectan el frontend con el backend

El archivo `js/servicios.js` consume la API de Render y renderiza la seccion de servicios en el frontend.

URL base:

```txt
https://tp3-backend-grupo-5.onrender.com
```

Funciones y responsabilidades:

- `mostrarSpinner(mensaje)`: devuelve el HTML del spinner con un texto de carga.
- `cargarServicios()`: pide `GET /servicios`, guarda la respuesta en el array `servicios` y llama a `renderizarServicios`.
- `renderizarServicios(listaServicios)`: recibe una lista, limpia el contenedor y crea una tarjeta por cada servicio.
- `cargarDetalleServicio(servicio)`: usa el `id` del servicio clickeado, pide `GET /servicios/:id` y muestra el detalle en la modal.
- Evento `input` del buscador: filtra el array `servicios` por titulo y vuelve a renderizar los resultados.
- Eventos de cierre de modal: remueven la clase `activa` para ocultar la ventana de detalle.

Variables importantes:

- `API_URL`: guarda la URL base del backend.
- `contenedorServicios`: apunta al contenedor donde se agregan las tarjetas.
- `buscadorServicios`: apunta al input del buscador.
- `modalServicio`, `modalBody`, `cerrarModal`: conectan el JS con la modal.
- `servicios`: guarda en memoria la lista completa para poder filtrar sin hacer otro `fetch`.

La funcion `cargarServicios()` se ejecuta al final del archivo para cargar automaticamente los servicios al entrar a `servicios.html`.

## Flujo completo entre frontend y backend

```txt
1. El usuario abre servicios.html.
2. Se ejecuta cargarServicios().
3. El frontend pide GET /servicios a Render.
4. El backend lee servicios.json y responde un array.
5. El frontend crea una tarjeta por cada servicio.
6. El usuario puede filtrar por nombre con el buscador.
7. El usuario hace click en una tarjeta.
8. El frontend pide GET /servicios/:id.
9. El backend lee serviciosDetalle.json y responde el detalle.
10. El frontend muestra el detalle dentro de una modal.
```

## Rutas actuales del backend

El backend esta construido con Node.js y Express. Las rutas actuales estan separadas en archivos dentro de `routes/` y su logica esta en `controllers/`.

### GET /

Ruta de estado de la API.

```txt
GET /
```

Respuesta esperada:

```json
{
  "ok": true,
  "mensaje": "API Aurum Motors funcionando"
}
```

Sirve para verificar rapidamente que la API desplegada en Render esta activa.

### GET /servicios

```txt
GET /servicios
```

Devuelve el listado general de servicios ofrecidos.

Archivo consultado:

```txt
data/servicios.json
```

Controlador:

```txt
controllers/serviciosController.js
```

Funcion:

```js
getServicios
```

### GET /servicios/:id

```txt
GET /servicios/:id
```

Devuelve el detalle de un servicio especifico segun el `id` recibido por parametro.

Ejemplo:

```txt
GET /servicios/1
```

Archivo consultado:

```txt
data/serviciosDetalle.json
```

Funcion:

```js
getServicioDetalleById
```

### GET /equipo

```txt
GET /equipo
```

Devuelve el listado de integrantes del equipo.

Archivo consultado:

```txt
data/equipo.json
```

Controlador:

```txt
controllers/equipoController.js
```

Funcion:

```js
getEquipo
```

### Rutas pendientes segun la consigna

La consigna tambien solicita otras rutas que seran agregadas por otros integrantes del equipo:

```txt
GET /perfil/:id
```

Esta ruta debe devolver los datos del usuario logueado, incluyendo nombre, mail, fecha de registro, foto y ultimos 3 pedidos.

Como opcional, la consigna propone:

```txt
POST /login
```

Esta ruta serviria para recibir usuario y contrasena desde el frontend y verificar los datos contra un JSON de usuarios.

Cuando esas funcionalidades se implementen, cada integrante debe completar esta documentacion con sus rutas, funciones, JSON y flujo correspondiente.

## Descripcion del proyecto

Sitio web desarrollado como trabajo practico para la materia Programacion III.

La pagina representa a Aurum Motors, una concesionaria de autos de alta gama.

El objetivo del TP3 es conectar el frontend del TP1 con una API REST desarrollada con Node.js y Express, utilizando archivos JSON como fuente de datos simulada y desplegando el backend en Render.

## Grupo e integrantes

Grupo 5.

## Integrantes y contribuciones

- Vladimir Kozik (rama: alumno1_kozik)
  - Armado de la estructura base del backend con Node.js, Express, rutas, controladores y archivos JSON.
  - Configuracion inicial del servidor y deploy en Render.
  - Participacion en la integracion frontend de servicios con consumo de API, renderizado dinamico y documentacion.

- Conrado Lanusse (rama: alumno2_lanusse)
  -
  -
  -

- Laureano Kronemberger (rama: alumno3_kronemberger)
  -
  -
  -

- Santino Aloisio (rama: alumno4_aloisio)
  - Participacion en servicios del backend.
  - Participacion en servicios del frontend.
  - Implementacion y ajustes de la seccion de servicios.

- Francisco Jaszczuk (rama: alumno5_jaszczuk)
  -
  -
  -

## Distribucion de carpetas del backend

```txt
tp3_backend_grupo_5/
├── app.js
├── package.json
├── package-lock.json
├── models/
│   └── server.js
├── routes/
│   ├── serviciosRoutes.js
│   └── equipoRoutes.js
├── controllers/
│   ├── serviciosController.js
│   └── equipoController.js
└── data/
    ├── servicios.json
    ├── serviciosDetalle.json
    └── equipo.json
```

## Explicacion de archivos principales del backend

### app.js

Es el punto de entrada de la aplicacion.

Importa la clase `Server`, crea una instancia y ejecuta `server.listen()`.

### models/server.js

Configura el servidor Express.

Responsabilidades:

- Cargar variables de entorno con `dotenv`.
- Crear la aplicacion con `express()`.
- Definir el puerto con `process.env.PORT || 3000`.
- Montar las rutas de servicios y equipo.
- Agregar una ruta raiz `/`.
- Agregar una respuesta 404 para rutas inexistentes.

### routes/serviciosRoutes.js

Define las rutas relacionadas con servicios:

```js
router.get('/', getServicios)
router.get('/:id', getServicioDetalleById)
```

No contiene la logica completa. Solo conecta cada ruta con su controlador.

### controllers/serviciosController.js

Contiene la logica para leer los JSON de servicios y responder al frontend.

Funciones principales:

- `leerJson(nombreArchivo)`
- `getServicios(req, res)`
- `getServicioDetalleById(req, res)`

### routes/equipoRoutes.js

Define la ruta:

```js
router.get('/', getEquipo)
```

Al estar montada en `server.js` como `/equipo`, la URL final es:

```txt
GET /equipo
```

### controllers/equipoController.js

Lee `data/equipo.json` y responde con el listado de integrantes.

## Ejemplos de estructura JSON

### servicios.json

```json
[
  {
    "id": 1,
    "titulo": "Cambio de Aceite",
    "imagen": "../assets/servicios-imgs/cambio_de_aceite.png"
  }
]
```

Este archivo se usa para renderizar las tarjetas del catalogo de servicios.

### serviciosDetalle.json

```json
[
  {
    "id": 1,
    "titulo": "Cambio de Aceite",
    "precio": 25000,
    "descripcion": "Reemplazo de aceite y filtros para mejorar el rendimiento del motor."
  }
]
```

Este archivo se usa para mostrar el detalle al hacer click en una tarjeta.

### equipo.json

```json
[
  {
    "id": 1,
    "nombre": "Martin Lopez",
    "rol": "Gerente Comercial",
    "descripcion": "Responsable de la estrategia de ventas, atencion personalizada a clientes premium y cierre de operaciones de alto valor.",
    "foto": "../assets/imgs/modelo1.jpg"
  }
]
```

Este archivo se usa para responder la ruta `GET /equipo`.

## Instalacion del backend

```bash
npm install
```

## Ejecucion local

Modo desarrollo:

```bash
npm run dev
```

Modo produccion:

```bash
npm start
```

Servidor local:

```txt
http://localhost:3000
```

## Deploy

Backend desplegado en Render:

```txt
https://tp3-backend-grupo-5.onrender.com
```

Configuracion usada en Render:

```txt
Build Command: npm install
Start Command: npm start
```

El backend usa:

```js
process.env.PORT || 3000
```

Render asigna automaticamente `process.env.PORT`. En local se usa el puerto `3000`.

## Consignas opcionales implementadas

### Spinner o mensaje de carga

Se implemento un spinner en el frontend mientras se espera la respuesta de la API de Render.

### Buscador sencillo

Se implemento un buscador desde el frontend que filtra los servicios por nombre usando:

```js
filter()
includes()
toLowerCase()
```
