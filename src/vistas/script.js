const API_URL = 'http://3.139.70.125:3000/api'; 


document.getElementById('formUsuario').addEventListener('submit', async (e) => {
  e.preventDefault();
  const usuario = {
    cedula: document.getElementById('cedula').value,
    email: document.getElementById('email').value,
    nombre: document.getElementById('nombre').value,
    edad: document.getElementById('edad').value,
  };

  try {
    const res = await fetch(`${API_URL}/usuarios/registrar`, {
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


document.getElementById('capturarPokemon').addEventListener('click', () => {
  document.getElementById('capturaForm').style.display = 'block';
});

document.getElementById('cancelarCaptura').addEventListener('click', () => {
  document.getElementById('capturaForm').style.display = 'none';
});

document.getElementById('formCaptura').addEventListener('submit', async (e) => {
  e.preventDefault();
  const captura = {
    pokemon: document.getElementById('pokemon').value,
    usuarioCedula: document.getElementById('cedulaCaptura').value,
  };

  try {
    const res = await fetch(`${API_URL}/capturados/capturar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(captura),
    });

    if (!res.ok) {
      const error = await res.json();
      alert(`Error al capturar Pokémon: ${error.mensaje}`);
      return;
    }

    alert('Pokémon capturado con éxito');
    listarCapturas();
    document.getElementById('capturaForm').style.display = 'none';
    document.getElementById('formCaptura').reset();
  } catch (error) {
    console.error('Error al capturar Pokémon:', error);
  }
});

// Listar usuarios
async function listarUsuarios() {
  try {
    const res = await fetch(`${API_URL}/usuarios/listarusuario`);
    const usuarios = await res.json();
    const tabla = document.getElementById('tablaUsuarios').querySelector('tbody');
    tabla.innerHTML = ''; 
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
    tabla.innerHTML = ''; 
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

// Listar capturas
async function listarCapturas() {
  try {
    const res = await fetch(`${API_URL}/capturados/listarcapturas`);
    const capturas = await res.json();
    const tabla = document.getElementById('tablaCapturas').querySelector('tbody');
    tabla.innerHTML = ''; 
    capturas.forEach((captura) => {
      const fila = `
        <tr>
          <td>${captura.pokemon}</td>
          <td>${captura.usuarioCedula}</td>
          <td>${new Date(captura.fechaCaptura).toLocaleString()}</td>
        </tr>
      `;
      tabla.innerHTML += fila;
    });
  } catch (error) {
    console.error('Error al listar capturas:', error);
  }
}

// Inicializar las listas
listarUsuarios();
listarPokemon();
listarCapturas();



