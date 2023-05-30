const Authorization = {
    title: "Authorization",
    render: () => {
      return `
        <section id="authorization" class="authorization">
          <h1 class="authorization__title">Authorization</h1>
          <form action="" method="post">
            <label class="label__name" for="text">Write your name</label>
            <input class="input__name" type="text" value="Player">
            <button class="btn" type="submit">SUBMIT</button>
          </form>
        </section>
      `;
    }
  };
  
  export default Authorization;
  