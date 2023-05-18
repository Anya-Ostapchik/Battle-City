const Rules = {
  id: "rules",
  title: "Rules",
  render: () => {
    return `
      <section class="rules" id="rules__content">
        <h1 class="rules__title">CONTROL</h1>
        <div class="rules__text_wrap">
            <h2 class="rules__player">1 PLAYER</h2>
            <span class="rules__text"><span class="rules__text_elem">←</span> - MOVE TO THE LEFT; </span>
            <span class="rules__text"><span class="rules__text_elem">↑</span> - UPWARD MOVEMENT</span>
            <span class="rules__text"><span class="rules__text_elem">→</span> - MOVE TO THE RIGHT</span>
            <span class="rules__text"><span class="rules__text_elem">↓</span> - DOWNWARD MOVEMENT</span>
            <span class="rules__text"><span class="rules__text_elem">Space</span> - SHOOT</span>
            <span class="rules__text"><span class="rules__text_elem">Escape</span> - PAUSE</span>
        </div>
        <h2 class="rules__wish">GOOD GAME</h2>
        <a href="#main" class="back">BACK</a>
      </section>
    `;
  }
};

export default Rules;
