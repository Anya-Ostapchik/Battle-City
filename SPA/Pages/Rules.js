const Rules = {
  id: "rules",
  title: "Rules",
  render: () => {
    return `
      <section class="rules" id="rules__content">
        <h1 class="rules__title">CONTROL</h1>
        <div class="rules__text_wrap">
          <h2 class="rules__player">1 PLAYER</h2>
          <ul>
            <li class="rules__text"><span class="rules__text_elem">←</span> - MOVE TO THE LEFT;</li>
            <li class="rules__text"><span class="rules__text_elem">↑</span> - UPWARD MOVEMENT;</li>
            <li class="rules__text"><span class="rules__text_elem">→</span> - MOVE TO THE RIGHT;</li>
            <li class="rules__text"><span class="rules__text_elem">↓</span> - DOWNWARD MOVEMENT;</li>
            <li class="rules__text"><span class="rules__text_elem">Space</span> - SHOOT;</li>
          </ul>
        </div>
        <div class="rules__phone">
            <h2 class="rules__player">1 PLAYER</h2>
            <ul>
              <li class="rules__text"><span class="rules__text_elem"><</span> - MOVE TO THE LEFT; </li>
              <li class="rules__text"><span class="rules__text_elem">˄</span> - UPWARD MOVEMENT</li>
              <li class="rules__text"><span class="rules__text_elem">></span> - MOVE TO THE RIGHT</li>
              <li class="rules__text"><span class="rules__text_elem">˅</span> - DOWNWARD MOVEMENT</li>
              <li class="rules__text">
              <svg class="rules__text_elem_shoot">
                <use xlink:href="../../img/sprite.svg#shoot"></use>
              </svg>
              - SHOOT
              </li>
            </ul>
        </div>
        <h2 class="rules__wish">GOOD GAME</h2>
        <a href="#main" class="back">BACK</a>
      </section>
    `;
  }
};

export default Rules;