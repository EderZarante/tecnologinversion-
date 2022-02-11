const articleForm = document.querySelector("#articleForm");
const title = document.querySelector("#title");
const description = document.querySelector("#description");

articleForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (savedId) {
    updateArticle(savedId, title.value, description.value);
  } else {
    saveArticle(title.value, description.value);
  }

  title.value = "";
  description.value = "";

  title.focus();
});
