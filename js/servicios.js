const API_URL = 'https://tp3-backend-grupo-5.onrender.com'

const contenedorServicios = document.querySelector('#servicios-container')
const buscadorServicios = document.querySelector('#buscador-servicios')

const modalServicio = document.querySelector('#modal-servicio')
const modalBody = document.querySelector('#modal-body')
const cerrarModal = document.querySelector('#cerrar-modal')

let servicios = []

function mostrarSpinner(mensaje) {
    return `
        <div class="loader-container">
            <div class="spinner"></div>
            <p>${mensaje}</p>
        </div>
    `
}

async function cargarServicios() {
    try {
        if (!contenedorServicios) return

        contenedorServicios.innerHTML = mostrarSpinner('Cargando servicios...')

        const response = await fetch(`${API_URL}/servicios`)
        servicios = await response.json()

        renderizarServicios(servicios)
    } catch (error) {
        console.log(`Error, no se pudieron traer los datos de los servicios. ${error}`)
        contenedorServicios.innerHTML = '<p class="mensaje-error">Error al cargar los servicios.</p>'
    }
}

function renderizarServicios(listaServicios) {
    contenedorServicios.innerHTML = ''

    if (listaServicios.length === 0) {
        contenedorServicios.innerHTML = '<p>No se encontraron servicios.</p>'
        return
    }

    listaServicios.forEach((servicio) => {
        const div = document.createElement('div')
        div.classList.add('servicio')

        div.innerHTML = `
            <img src="${servicio.imagen}" alt="${servicio.titulo}">
            <p>${servicio.titulo}</p>
        `

        div.addEventListener('click', () => {
            cargarDetalleServicio(servicio)
        })

        contenedorServicios.append(div)
    })
}

async function cargarDetalleServicio(servicio) {
    try {
        modalBody.innerHTML = mostrarSpinner('Cargando detalle...')
        modalServicio.classList.add('activa')

        const response = await fetch(`${API_URL}/servicios/${servicio.id}`)
        const detalle = await response.json()

        modalBody.innerHTML = `
            <img src="${servicio.imagen}" alt="${detalle.titulo}">
            <h2>${detalle.titulo}</h2>
            <p>${detalle.descripcion}</p>
            <p>Precio: $${detalle.precio}</p>
        `
    } catch (error) {
        console.log(`Error, no se pudo traer el detalle del servicio. ${error}`)
        modalBody.innerHTML = '<p>Error al cargar el detalle.</p>'
    }
}

buscadorServicios.addEventListener('input', () => {
    const textoBuscado = buscadorServicios.value.toLowerCase()

    const serviciosFiltrados = servicios.filter((servicio) => {
        return servicio.titulo.toLowerCase().includes(textoBuscado)
    })

    renderizarServicios(serviciosFiltrados)
})

cerrarModal.addEventListener('click', () => {
    modalServicio.classList.remove('activa')
})

modalServicio.addEventListener('click', (event) => {
    if (event.target === modalServicio) {
        modalServicio.classList.remove('activa')
    }
})

cargarServicios()