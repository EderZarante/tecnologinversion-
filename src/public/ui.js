const articlesList = document.querySelector("#articles");

let savedId = "";

const articleUI = (article) => {
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card card-body rounded-0 animate__animated animate__fadeInUp mb-2">
      <div class="d-flex justify-content-between">
          <h1 class="card-title h3">${article.title}</h1>
          <div>
              <button class="btn btn-danger delete" data-id="${article.id}">Eliminar</button>
              <button class="btn btn-secondary update" data-id="${article.id}">Editar</button>
          </div>
      </div>
      <p>${article.description}</p>
  </div>
`;
  const btnDelete = div.querySelector(".delete");
  const btnUpdate = div.querySelector(".update");

  btnDelete.addEventListener("click", () => deleteArticle(btnDelete.dataset.id));

  btnUpdate.addEventListener("click", () => {
    socket.emit("client:getarticle", btnUpdate.dataset.id);
  });

  return div;
};

const renderArticles = (articles) => {
  savedId = "";
  articlesList.innerHTML = "";
  console.log(articles);
  articles.forEach((article) => {
    articlesList.append(articleUI(article));
  });
};

const appendArticle = (article) => {
  articlesList.append(articleUI(article));
};
