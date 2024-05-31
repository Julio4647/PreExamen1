//Ejemplo var, let y const


function ejemplo1() {
    
    var x = 10;
    if (true) {
      var x = 20; // Se redeclara y sobrescribe x en el mismo scope
      console.log(`Dentro del scope de var x: ${x}`);
    }
    console.log(`Fuera del scope de var x: ${x}`); // fuera de el scope se sigue manteniendo el valor ya cambiado de x
  
   
    let y = 10;
    if (true) {
      let y = 20; // En este caso let tiene scope de bloque, esto se refiere a que el nuevo valor solo va a estar disponible dentro del ese scope 
      console.log(`Dentro del scope de let y: ${y}`); 
    }
    console.log(`Fuera del scope de let y: ${y}`); // Fuera de su scope el valor sigue siendo el mismo que esta declarado fuera del scope
  

    const z = 10;
    if (true) {
      const z = 20; // En const tiene scope de bloque, igual como en el ejemplo de let, la reasignacion del valor z solo va estar disponible dentro de ese scope
      console.log(`Dentro del scope de const z: ${z}`);
    }
    console.log(`Fuera del scope de const z: ${z}`); 
    //si fuera del scope reasignaramos el valor de z nos marcaria error, esto porque con const no se pueden reasignar valores,
    //osea si pusieramos const z = 100, eso lo marcaria como error
  }
  
  ejemplo1();
  

//Consumo de APIS

(async () => {
  let idUser;
  let idPosts;
  fetch(`${baseUrl}/users`)
    .then((response) => response.json())
    .then((users) => {
      const firstUser = users[0];
      idUser = users[0].id;
      console.log("First user:", firstUser);
    })
    .catch((error) => console.error("Error:", error));

  try {
    const response = await fetch(`${baseUrl}/posts`, {
      method: "POST",
      body: JSON.stringify({
        title: "Nuevo posts",
        body: "Cuerpo del nuevo posts",
        userId: idUser,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    idPosts = data.id;
  } catch (error) {
    console.error("Error:", error);
  }

  try {
    const response = await fetch(`${baseUrl}/posts/${idPosts}`, {
      method: "PUT",
      body: JSON.stringify({
        id: idPosts,
        title: "Updated post",
        body: "This is an updated post.",
        userId: idUser,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }

  fetch(`${baseUrl}/posts/${idPosts}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then(() => console.log("Post deleted"))
    .catch((error) => console.error("Error:", error));
})();





//Simulacion de promesa con tiempo

const simulacionPromesa = (tiempo) => {
    return new Promise((resolver, rechazar) => {
      const valorAleatorio = Math.random();
      setTimeout(() => {
        if (valorAleatorio > 0.5) {
          resolver(`Promesa resuelta después de ${tiempo} segundos`);
        } else {
          rechazar(`Promesa rechazada después de ${tiempo} segundos`);
        }
      }, tiempo * 1000);
    });
  };
  
  simulacionPromesa(5)
    .then(message => console.log(message))
    .catch(error => console.error(error));
  




//Ejemplo Try-Catch-Finally


const ejemplo = (validacion) => {
    try {
      console.log('Inicio de try');
      if (validacion) {
        throw new Error('Se produjo un error');
      }
      console.log('Operación exitosa en try');
    } catch (error) {
      console.error(`Error catch: ${error.message}`);
    } finally {
      console.log('Ejecución en finally: Esto siempre se ejecuta no importa de si entra Try o en Catch');
    }
  };
  
//   // Caso exitoso
//   console.log('--- Caso exitoso ---');
//   ejemplo(false);
  
  // Caso con error
  console.log('--- Caso con error ---');
  ejemplo(true);
  


//alrevrz el consumo de apis



// a) Obtener una lista de usuarios y seleccionar el primer usuario
const getUser = () => {
  return fetch(`${baseUrl}/users`).then(response => {
    if (!response.ok) throw new Error('Error al obtener usuarios');
    return response.json();
  }).then(users => users[0]);
};

// b) Crear un nuevo post para el usuario seleccionado
const crearPost = async (userId) => {
  const response = await fetch(`${baseUrl}/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title: 'Nuevo Post',
      body: 'Contenido del nuevo post',
      userId: userId,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Error al crear post');
  return response.json();
};

// c) Actualizar el título del post recién creado
const actualizarPost = async (postId) => {
  const response = await fetch(`${baseUrl}/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: 'Título actualizado',
      body: 'Contenido del post actualizado',
      userId: 1,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Error al actualizar post');
  return response.json();
};

// d) Eliminar el post recién actualizado
const borrarPost = (postId) => {
  return fetch(`${baseUrl}/posts/${postId}`, {
    method: 'DELETE',
  }).then(response => {
    if (!response.ok) throw new Error('Error al eliminar post');
    console.log('Post eliminado exitosamente');
  });
};

// Flujo encadenado
(async () => {
  const user = await getUser();
  if (user) {
    const post = await crearPost(user.id);
    if (post) {
      await actualizarPost(post.id);
      borrarPost(post.id);
    }
  }
})();