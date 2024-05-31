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
