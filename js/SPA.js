/* ----- spa init module --- */
const mySPA = (function() {

    /* ------- begin view -------- */
    function ModuleView() {
      let myModuleContainer = null;
    //   let menu = null;
      let contentContainer = null;
  
      const HomeComponent = {
        id: "main",
        title: "Battle City",
        render: () => {
          return `
            <section class="menu" id="menu">
                <div class="start" id="start">
                    <div class="img__wrapper">
                        <img class="start__img" src="img/sprite2.png">
                    </div>     
                    <ul>
                        <li id="player_one"><a class="list" href="#">1 PLAYER</a></li>
                        <li id="player_two"><a class="list" href="#">2 PLAYER</a></li>
                        <li id="statistics"><a class="list" href="#">STATISTICS</a></li>
                        <li id="rules"><a class="list" href="#">RULES</a></li>
                    </ul>        
                </div>
            </section>
          `;
        }
      };
  
      const RulesComponent = {
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
                    <a href="#menu" class="rules__back">BACK</a>
            </section>
          `;
        }
      };
  
      const StatisticsComponent = {
        id: "statistics",
        title: "Statistics",
        render: () => {
          return `
            <section class="statistics" id="statistics__content">
                <div class="statistics__wrap" id="statist"></div>
            </section>
          `;
        }
      };
      const LevelComponent = {
        id: "level",
        title: "Game",
        render: () => {
          return `
            <section id="level" class="level">
                <div class="level__wrap">
                    <p class="level__txt">STAGE <span id="level__num">1</span></p>
                </div>
            </section>
          `;
        }
      };
      const GameComponent = {
        id: "game",
        title: "Game",
        render: () => {
          return `
            <section class="canvas__wrap">
                <canvas class="canvas" id="canvas" width="832" height="624"></canvas>
                <div class="canvas__info">
                    <div class="canvas__count-tank"></div>
                    <div class="canvas__players">
                        <div class="canvas__lives">
                            <p class="canvas__player">Ⅰ P</p>
                            <p class="canvas__num_lives" id="canvas__num_lives_one">2</p>
                        </div>
                        <div class="canvas__stage">1</div>
                    </div>
                </div>
            </section>
          `;
        }
      };
  
      const ErrorComponent = {
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
  
      const router = {
        main: HomeComponent,
        rules: RulesComponent,
        statistics: StatisticsComponent,
        level: LevelComponent,
        game: GameComponent,
        default: HomeComponent,
        error: ErrorComponent
      };
  
      this.init = function(container) {
        myModuleContainer = container;
        // menu = myModuleContainer.querySelector("#mainmenu");
        contentContainer = myModuleContainer.querySelector(".content");
      }
  
      this.renderContent = function(hashPageName) {
        let routeName = "default";
  
        if (hashPageName.length > 0) {
          routeName = hashPageName in router ? hashPageName : "error";
        }
  
        window.document.title = router[routeName].title;
        contentContainer.innerHTML = router[routeName].render();
      }
    };
    /* -------- end view --------- */
    /* ------- begin model ------- */
    function ModuleModel () {
        let myModuleView = null;
  
        this.init = function(view) {
          myModuleView = view;
        }
  
        this.updateState = function(hashPageName) {
          myModuleView.renderContent(hashPageName);
        }
    }
  
    /* -------- end model -------- */
    /* ----- begin controller ---- */
    function ModuleController () {
        let myModuleContainer = null;
        let myModuleModel = null;
  
        this.init = function(container, model) {
          myModuleContainer = container;
          myModuleModel = model;
  
          // вешаем слушателя на событие hashchange
          window.addEventListener("hashchange", this.updateState);
  
          this.updateState(); //первая отрисовка
        }
  
        this.updateState = function() {
          const hashPageName = location.hash.slice(1).toLowerCase();
          myModuleModel.updateState(hashPageName);
        }
    };
    /* ------ end controller ----- */
  
    return {
        init: function(container) {
        //   this.main(container);
  
          const view = new ModuleView();
          const model = new ModuleModel();
          const controller = new ModuleController();
  
          //связываем части модуля
          view.init(document.getElementById(container));
          model.init(view);
          controller.init(document.getElementById(container), model);
        },
  
        // main: function(container) {
        //   //предварительно что то можно сделать
        //   console.log(`Иницилизируем SPA для контейнера "${container}"`);
        // },
    };
  
  }());
  /* ------ end app module ----- */
  
  /*** --- init module --- ***/
  document.addEventListener("DOMContentLoaded", mySPA.init("root")); // инициализируем модуль как только DOM готов.