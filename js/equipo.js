const API_URL = 'https://tp3-backend-grupo-5.onrender.com'

const contenedorEquipo = document.querySelector('#equipo-container')

function mostrarSpinner(mensaje) {
  return `
    <div class="loader-container">
      <div class="spinner"></div>
      <p>${mensaje}</p>
    </div>
  `
}

async function cargarEquipo() {
  try {
    if (!contenedorEquipo) return

    contenedorEquipo.innerHTML = mostrarSpinner('Cargando equipo...')

    const response = await fetch(`${API_URL}/equipo`)
    const data = await response.json()

    contenedorEquipo.innerHTML = ''

    data.forEach((miembro) => {
      const div = document.createElement('div')
      div.classList.add('miembro-card')

      div.innerHTML = `
        <img src="${miembro.foto}" alt="${miembro.nombre}">
        <h3>${miembro.nombre}</h3>
        <h4>${miembro.rol}</h4>
        <p>${miembro.descripcion}</p>
      `

      contenedorEquipo.append(div)
    })
  } catch (error) {
    console.log(`Error, no se pudieron traer los datos del equipo. ${error}`)

    if (contenedorEquipo) {
      contenedorEquipo.innerHTML = '<p class="mensaje-error">Error al cargar el equipo.</p>'
    }
  }
}

cargarEquipo()