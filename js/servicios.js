const contenedorServicios = document.querySelector('#servicios-container')

async function cargarServicios() {
  try {
        if (!contenedorServicios) return

        contenedorServicios.innerHTML = `
        <div class="loader-container">
            <p>Cargando servicios...</p>
        </div>
        `

        const response = await fetch('http://localhost:3000/servicios')
        const data = await response.json()

        contenedorServicios.innerHTML = ''

        console.log(response)
        console.log(data)

        data.forEach((servicio) => {
            const div = document.createElement('div')
            div.classList.add('servicio')

            div.innerHTML = `
                <img src="${servicio.imagen}" alt="${servicio.nombre}">
                <h3>${servicio.nombre}</h3>
                <p>${servicio.categoria}</p>
                <p>$ ${servicio.precio}</p>
            `

            contenedorServicios.append(div)
        })
    } catch (error) {
        console.log(`Error, no se pudieron traer los datos de los servicios. ${error}`)

        if (contenedorServicios) {
        contenedorServicios.innerHTML = '<p class="mensaje-error">Error al cargar los servicios.</p>'
        }
    }
}

cargarServicios()
