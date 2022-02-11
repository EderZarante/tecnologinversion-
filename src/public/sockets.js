const socket = io.connect();


const saveArticle = (title, description) => {
  socket.emit("client:newarticle", {
    title,
    description,
  });
};


const deleteArticle = (id) => {
  socket.emit("client:deletearticle", id);
};

const updateArticle= (id, title, description) => {
  socket.emit("client:updatearticle", {
    id,
    title,
    description,
  });
};

socket.on("server:loadarticles", renderArticles);

socket.on("server:newarticle", appendArticle);

socket.on("server:selectedarticle", (article) => {
  const title = document.getElementById("title");
  const description = document.getElementById("description");

  title.value = article.title;
  description.value = article.description;

  savedId = article.id;
});
