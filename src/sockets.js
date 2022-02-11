import { v4 as uuid } from "uuid";

let articles = [];

export default (io) => {
  io.on("connection", (socket) => {
    // console.log(socket.handshake.url);
    console.log("nuevo socket connectado:", socket.id);

    // Send all messages to the client
    socket.emit("server:loadarticles", articles);

    socket.on("client:newarticle", (newArticle) => {
      const article = { ...newArticle, id: uuid() };
      articles.push(article);
      io.emit("server:newarticle", article);
    });

    socket.on("client:deletearticle", (articleId) => {
      console.log(articleId);
      articles = articles.filter((article) => article.id !== articleId);
      io.emit("server:loadarticles", articles);
    });

    socket.on("client:getarticle", (articleId) => {
      const article = articles.find((article) => article.id === articleId);
      socket.emit("server:selectedarticle", article);
    });

    socket.on("client:updatearticle", (updatedArticle) => {
      articles = articles.map((article) => {
        if (article.id === updatedArticle.id) {
          article.title = updatedArticle.title;
          article.description = updatedArticle.description;
        }
        return article;
      });
      io.emit("server:loadarticles", articles);
    });

    socket.on("disconnect", () => {
      console.log(socket.id, "disconnected");
    });
  });
};
