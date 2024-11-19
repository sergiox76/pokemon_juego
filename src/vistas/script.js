const API_URL = 'http://3.145.30.157:3007/api'; // Base URL para la API

// Registrar Usuario
document.getElementById('formUsuario').addEventListener('submit', async (e) => {
  e.preventDefault();

  const usuario = {
    cedula: document.getElementById('cedula').value,
    email: document.getElementById('email').value,
    nombre: document.getElementById('nombre').value,
    edad: document.getElementById('edad').value,
  };

  try {
    const res = await fetch(`${API_URL}/usuario/registrar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario),
    });

    if (!res.ok) {
      const error = await res.json();
      alert(`Error al registrar usuario: ${error.mensaje}`);
      return;
    }

    alert('Usuario registrado con éxito');
    listarUsuarios();
    document.getElementById('formUsuario').reset();
  } catch (error) {
    console.error('Error al registrar usuario:', error);
  }
});

// Registrar Pokémon
document.getElementById('formPokemon').addEventListener('submit', async (e) => {
  e.preventDefault();

  const pokemon = {
    nombre: document.getElementById('nombrePokemon').value,
    tipo: document.getElementById('tipo').value,
    poder: document.getElementById('poder').value,
  };

  try {
    const res = await fetch(`${API_URL}/pokemon/registrar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pokemon),
    });

    if (!res.ok) {
      const error = await res.json();
      alert(`Error al registrar Pokémon: ${error.mensaje}`);
      return;
    }

    alert('Pokémon registrado con éxito');
    listarPokemon();
    document.getElementById('formPokemon').reset();
  } catch (error) {
    console.error('Error al registrar Pokémon:', error);
  }
});

// Capturar Pokémon
async function capturarPokemon(pokemonId) {
  const cedula = prompt('Introduce tu cédula para capturar el Pokémon:');

  if (!cedula) {
    alert('Debes ingresar tu cédula para capturar el Pokémon.');
    return;
  }

  const captura = {
    usuarioCedula: cedula,
    pokemonId: pokemonId,
  };

  try {
    const res = await fetch(`${API_URL}/captura/capturar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(captura),
    });

    if (!res.ok) {
      const error = await res.json();
      alert(`Error al capturar Pokémon: ${error.mensaje}`);
      return;
    }

    alert('¡Pokémon capturado exitosamente!');
    listarCapturas();
  } catch (error) {
    console.error('Error al capturar Pokémon:', error);
    alert('Error al capturar Pokémon. Inténtalo de nuevo más tarde.');
  }
}

// Listar Usuarios
async function listarUsuarios() {
  try {
    const res = await fetch(`${API_URL}/usuario/listar`);
    const usuarios = await res.json();

    const tabla = document.getElementById('tablaUsuarios').querySelector('tbody');
    tabla.innerHTML = ''; // Limpiar la tabla

    usuarios.forEach((usuario) => {
      const fila = `
        <tr>
          <td>${usuario.cedula}</td>
          <td>${usuario.nombre}</td>
          <td>${usuario.email}</td>
          <td>${usuario.edad}</td>
        </tr>
      `;
      tabla.innerHTML += fila;
    });
  } catch (error) {
    console.error('Error al listar usuarios:', error);
  }
}

// Listar Pokémon
async function listarPokemon() {
  try {
    const res = await fetch(`${API_URL}/pokemon/listar`);
    const data = await res.json();

    const tablaPokemon = document.getElementById('tablaPokemon').querySelector('tbody');
    tablaPokemon.innerHTML = ''; // Limpiar la tabla

    data.forEach((pokemon) => {
      const fila = `
        <tr>
          <td>${pokemon.nombre}</td>
          <td>${pokemon.tipo}</td>
          <td>${pokemon.poder}</td>
          <td><button onclick="capturarPokemon(${pokemon.id})">Capturar</button></td>
        </tr>
      `;
      tablaPokemon.innerHTML += fila;
    });
  } catch (error) {
    console.error('Error al listar Pokémon:', error);
  }
}

// Listar Capturas
async function listarCapturas() {
  try {
    const res = await fetch(`${API_URL}/captura/listar`);
    const data = await res.json();

    if (data.capturado) {
      const tablaCapturas = document.getElementById('tablaCapturas').querySelector('tbody');
      tablaCapturas.innerHTML = ''; // Limpiar la tabla

      data.capturado.forEach((captura) => {
        const fila = tablaCapturas.insertRow();
        fila.insertCell(0).textContent = captura.pokemonId; // ID del Pokémon
        fila.insertCell(1).textContent = captura.usuarioCedula; // Cédula del capturador
        fila.insertCell(2).textContent = new Date(captura.createdAt).toLocaleString(); // Fecha formateada
      });
    } else {
      console.log('No se encontraron capturas.');
    }
  } catch (error) {
    console.error('Error al listar capturas:', error);
  }
}

// Inicializar las listas
listarUsuarios();
listarPokemon();
listarCapturas();




