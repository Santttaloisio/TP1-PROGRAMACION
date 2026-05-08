const contenedorEquipo = document.querySelector('#equipo-container')

async function cargarEquipo() {
  try {
    if (!contenedorEquipo) return

    contenedorEquipo.innerHTML = `
      <div class="loader-container">
        <p>Cargando equipo...</p>
      </div>
    `

    const response = await fetch('http://localhost:3000/equipo')
    const data = await response.json()

    contenedorEquipo.innerHTML = ''

    console.log(response)
    console.log(data)

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
