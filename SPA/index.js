import HomePage from "./Pages/HomePage.js";
import Statistics from "./Pages/Statistics.js";
import Rules from "./Pages/Rules.js";
import Level from "./Pages/Level.js";
import Game from "./Pages/Game.js";
// import Scoring from "./Pages/Scoring.js";
import ErrorPage from "./Pages/ErrorPage.js";

const components = {
  navbar: HomePage,
}

const routes = {
  main: HomePage,
  statistics: Statistics,
  rules: Rules,
  level: Level,
  game: Game,
  // scoring: Scoring,
  default: HomePage,
  error: ErrorPage,
};

/* ----- spa init module --- */
const mySPA = (function () {

  /* ------- begin view -------- */
  function ModuleView() {
    let contentContainer = null;
    let menu = null;
    let routes = null;
    let soundStageStart = null;

    this.init = function (_container, _routes) {
      contentContainer = _container;
      routes = _routes;
      menu = contentContainer.querySelector("#mainmenu");
      soundStageStart = new Audio('sound/sound_stage_start.ogg');
    }

    this.renderContent = function (_hashPageName) {
      let routeName = "default";

      if (_hashPageName.length > 0) {
        routeName = _hashPageName in routes ? _hashPageName : "error";
      }

      window.document.title = routes[routeName].title;
      contentContainer.innerHTML = routes[routeName].render();

      // if(_hashPageName === 'game'){

      //   const level = document.querySelector('.level');
      //   level.classList.add('level_active');

      //   let i = 0;

      //   const id = setInterval(() => {
      //     i++;
      //     if(i === 2){
      //       soundStageStart.play();
      //     }
      //     if(i === 5){
      //       level.classList.remove('level_active');
      //       clearInterval(id);
      //     }
      //   }, 1000);
      // }
    }
  };
  /* -------- end view --------- */
  /* ------- begin model ------- */
  function ModuleModel() {
    let myModuleView = null;

    this.init = function (view) {
      myModuleView = view;
    }

    this.updateState = function(_pageName) {
      if(sessionStorage.getItem("is_reloaded")){
        _pageName = 'main';
      }
        myModuleView.renderContent(_pageName);
    }
  }

  /* -------- end model -------- */
  /* ----- begin controller ---- */
  function ModuleController() {
    let myModuleModel = null;
    let myModuleContainer = null;

    this.init = function (content, model) {
      myModuleModel = model;
      myModuleContainer = content;

      // вешаем слушателей на событие hashchange и beforeunload
      window.addEventListener("hashchange", this.updateState);

      window.addEventListener('click', function (){
        sessionStorage.removeItem("is_reloaded");
      });

      myModuleContainer.querySelector("#mainmenu").addEventListener("click", function (event) {
        event.preventDefault();
        window.location.hash = event.target.getAttribute("href");
      });


      // window.onbeforeunload = function() {
      //   return false;
      // };


      this.updateState(); //первая отрисовка
    }

    this.updateState = function() {
      const hashPageName = location.hash.slice(1).toLowerCase();
      myModuleModel.updateState(hashPageName);
    }
  }
  /* ------ end controller ----- */

  return {
    init: function (root, routes, components) {
      sessionStorage.setItem("is_reloaded", true);
      location.hash = '#main';

      this.renderComponents(root, components);

      const view = new ModuleView();
      const model = new ModuleModel();
      const controller = new ModuleController();

      //связываем части модуля
      view.init(document.getElementById(root), routes);
      model.init(view);
      controller.init(document.getElementById(root), model);
    },

    renderComponents: function (root, components) {
      const container = document.getElementById(root);
      for (let item in components) {
        if (components.hasOwnProperty(item)) {
          container.innerHTML += components[item].render();
        }
      }
    },
  };

}());
/* ------ end app module ----- */

/*** --- init module --- ***/
mySPA.init("content", routes, components);
