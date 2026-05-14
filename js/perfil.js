const contenedorPerfil = document.querySelector('#perfil-container')
const API_URL = 'https://tp3-backend-grupo-5.onrender.com'

function setLoadingStatus(loading) {
  const submitBtn = document.querySelector('form button[type="submit"]')
  if (!submitBtn) return

  if (loading) {
    submitBtn.innerText = "Cargando..."
    submitBtn.disabled = true
  } else {
    submitBtn.innerText = "Ingresar"
    submitBtn.disabled = false

  }
}

async function tryLogin(e) {
  e.preventDefault()
  setLoadingStatus(true)

  const formData = new FormData(e.target)
  const data = Object.fromEntries(formData.entries())

  renderErrorMsg(false)

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const errorData = await response.json()

      throw new Error(
        errorData?.mensaje || "Error al iniciar sesión"
      )
    }

    const result = await response.json()
    if (result.ok) {
      renderProfile(result.perfil)
    }
  } catch (error) {
    console.error('[LOGIN ERROR]', error)
    renderErrorMsg(true, error)
  } finally {
    setLoadingStatus(false)
  }
}

function renderErrorMsg(show, msg = '') {
  const errorMsg = document.querySelector('#error-msg')
  if (show) {
    errorMsg.classList.remove('hide-text')
    errorMsg.innerText = msg
  } else {
    errorMsg.classList.add('hide-text')
    errorMsg.innerText = ''
  }
}

function renderLoginForm() {
  contenedorPerfil.innerHTML = `
    <section class="seccion-formulario">
      <h2>Inicio de sesión</h2>
      <p>Ingresá con tus credenciales para ver tu perfil.</p>
      <hr />
      <form>
          <div>
              <label for="usuario">Usuario:</label>
              <input type="text" id="usuario" name="usuario" required>
          </div>

          <div>
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" required>
          </div>

          <button type="submit" class="boton-primario">Ingresar</button>
          <p id="error-msg" class="hide-text"></p> 
      </form>
  </section>
  `

  contenedorPerfil.querySelector('form')?.addEventListener('submit', tryLogin)
}

function renderProfile(profile) {
  const { nombre, mail = '', fechaRegistro = '', foto, ultimosPedidos = [] } = profile

  contenedorPerfil.innerHTML = `
      <section class="seccion-contenido">
          <h1>Perfil</h1>
          <p>Tu cuenta y actividad en Aurum Motors.</p>
      </section>
      <section class="seccion-info seccion-perfil">
          <div>
              <h2>Datos personales</h2>
              <ul>
                  <li><strong>Nombre: </strong>${nombre}</li>
                  <li><strong>Email: </strong>${mail}</li>
                  <li><strong>Usuario desde: </strong>${fechaRegistro}</li>
              </ul>
          </div>
          <img src=${foto} alt=${nombre}} />
      </section>

      <section class="seccion-info">
          <h2>Últimos Pedidos</h2>
          <ul>
              ${ultimosPedidos.map(pedido => `<li>${pedido}</li>`).join('')}
          </ul>
      </section>
  `

  const btn = document.createElement('button')
  btn.classList.add('boton-primario')
  btn.innerText = 'Cerrar sesión'
  btn.addEventListener('click', renderLoginForm)

  contenedorPerfil.append(btn)
}

renderLoginForm()
