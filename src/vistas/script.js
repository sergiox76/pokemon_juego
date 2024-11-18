const API_URL = 'http://3.139.70.125:3000/'; 


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


listarUsuarios();
listarPokemon();



