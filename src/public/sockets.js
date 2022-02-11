const socket = io.connect();

/**
 * create a new note
 * @param {string} title a title for a new note
 * @param {string} description a description for a new note
 */
const saveArticle = (title, description) => {
  socket.emit("client:newarticle", {
    title,
    description,
  });
};

/**
 * delete a note based on an Id
 * @param {string} id a note ID
 */
const deleteArticle = (id) => {
  socket.emit("client:deletearticle", id);
};

/**
 * 
 * @param {string} id note ID
 * @param {string} title note title 
 * @param {string} description note description
 */
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
