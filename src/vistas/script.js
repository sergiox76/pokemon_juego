const API_URL = 'http://localhost:3000/api'; // Cambia según tu configuración

// Registrar Usuario
document.getElementById('formUsuario').addEventListener('submit', async (e) => {
  e.preventDefault();
  const usuario = {
    cedula: document.getElementById('cedula').value,
    email: document.getElementById('email').value,
    nombre: document.getElementById('nombre').value,
    edad: document.getElementById('edad').value,
  };
alert(usuario.cedula);

  try {
    const res = await fetch(`${API_URL}/usuarios/registrar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario),
    });

    if (res.ok) {
      alert('Usuario registrado con éxito');
      // Llama a la función para listar usuarios
      listarUsuarios();
      document.getElementById('formUsuario').reset(); // Limpia el formulario
    } else {
      alert('Error al registrar usuario');
    }
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

    if (res.ok) {
      alert('Pokémon registrado con éxito');
      // Llama a la función para listar pokémones
      listarPokemon();
      document.getElementById('formPokemon').reset(); // Limpia el formulario
    } else {
      alert('Error al registrar Pokémon');
    }
  } catch (error) {
    console.error('Error al registrar Pokémon:', error);
  }
});

// Listar Usuarios
async function listarUsuarios() {
  try {
    const res = await fetch(`${API_URL}/usuarios/listarusuario`);
    const usuarios = await res.json();
    const tabla = document.getElementById('tablaUsuarios').querySelector('tbody');
    tabla.innerHTML = ''; // Limpiar tabla antes de llenarla
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
    const res = await fetch(`${API_URL}/pokemon/listarpokemon`);
    const pokemones = await res.json();
    const tabla = document.getElementById('tablaPokemon').querySelector('tbody');
    tabla.innerHTML = ''; // Limpiar tabla antes de llenarla
    pokemones.forEach((pokemon) => {
      const fila = `
        <tr>
          <td>${pokemon.nombre}</td>
          <td>${pokemon.tipo}</td>
          <td>${pokemon.poder}</td>
        </tr>
      `;
      tabla.innerHTML += fila;
    });
  } catch (error) {
    console.error('Error al listar Pokémon:', error);
  }
}

// Cargar listas al inicio
listarUsuarios();
listarPokemon();



