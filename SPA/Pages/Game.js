const Game = {
    id: "game",
    title: "Game",
    render: () => {
      return `
        <section class="canvas__wrap">
          <div class="level">
            <p class="level__txt">STAGE <span id="level__num">1</span></p>
          </div>
          <div class="score">
            <div class="score__wrap">
              <p class="scoring__stage_txt">STAGE <span id="scoring__stage_num">1</span></p>
              <p class="scoring__player">I - player</p>
              <p class="scoring__total_score"></p>
            </div>
          </div>
          <div class="control">
            <svg class="canvas__arrow canvas__arrow-up">
              <use id="canvas__arrow-up" xlink:href="../../img/sprite.svg#arrow"></use>
            </svg>
            <svg class="canvas__arrow canvas__arrow-left">
              <use id="canvas__arrow-left" xlink:href="../../img/sprite.svg#arrow"></use>
            </svg>
            <svg class="canvas__arrow canvas__arrow-down">
              <use id="canvas__arrow-down" xlink:href="../../img/sprite.svg#arrow"></use>
            </svg>
            <svg class="canvas__arrow canvas__arrow-right">
              <use id="canvas__arrow-right" xlink:href="../../img/sprite.svg#arrow"></use>
            </svg>
          </div>
          <div class="canvas__wrapper">
            <canvas class="canvas" id="canvas" width="832" height="624"></canvas>
            <div class="canvas__info">
              <div class="canvas__count-tank"></div>
              <div class="canvas__players">
                <p class="canvas__player">I P</p>
                <p class="canvas__num_lives">5</p>
                <div class="canvas__stage">1</div>
              </div>
          </div>
          </div>
          <svg class="canvas__shoot">
            <use id="canvas__shoot" xlink:href="../../img/sprite.svg#shoot"></use>
          </svg>
        </section>
      `;
    }
  };
  
  export default Game;