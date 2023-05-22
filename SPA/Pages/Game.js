const Game = {
    id: "game",
    title: "Game",
    render: () => {
      return `
        <div class="level">
          <p class="level__txt">STAGE <span id="level__num">1</span></p>
        </div>
        <section class="canvas__wrap">
          <div class="canvas__wrapper">
            <canvas class="canvas" id="canvas" width="832" height="624"></canvas>
          </div>
          <div class="canvas__info">
              <div class="canvas__count-tank"></div>
              <div class="canvas__players">
                <p class="canvas__player">I P</p>
                <p class="canvas__num_lives">2</p>
                <div class="canvas__stage">1</div>
              </div>
          </div>
        </section>
      `;
    }
  };
  
  export default Game;
  