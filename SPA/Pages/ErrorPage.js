const ErrorPage = {
  id: "error",
  title: "Error",
  render: () => {
    return `
      <section class="error">
        <h1>Ошибка 404</h1>
        <p>Страница не найдена, попробуйте вернуться на <a href="#main">главную</a>.</p>
      </section>
    `;
  }
};

export default ErrorPage;
