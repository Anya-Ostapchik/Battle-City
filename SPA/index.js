import HomePage from "./Pages/HomePage.js";
import Statistics from "./Pages/Statistics.js";
import Rules from "./Pages/Rules.js";
import Level from "./Pages/Level.js";
import Game from "./Pages/Game.js";
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
    let i = 0;
    let svgElem = null;
    let anim = null;

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

      // if(_hashPageName === 'statistics'){
        
      // }

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

    this.createLoader = function(){
      const statistics = document.querySelector('#statistics__content');
      //лоадер
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS,"svg");
      svg.setAttributeNS(null, "viewBox", '0 0 25 25');
      svg.setAttributeNS(null, "width", '10%');
      svg.setAttributeNS(null, "height", '10%');
      svg.classList.add('svg');
      svg.innerHTML = '<path d="M12.432 8.42a2.203 2.203 0 0 1-2.196-2.21c0-1.22.983-2.21 2.196-2.21s2.196.99 2.196 2.21a2.208 2.208 0 0 1-2.196 2.21zm-4.677 1.756a2.014 2.014 0 0 1-2.007-2.02c0-1.116.899-2.02 2.007-2.02 1.109 0 2.007.904 2.007 2.02a2.017 2.017 0 0 1-2.007 2.02zm-1.984 4.569a1.77 1.77 0 0 1-1.636-1.1 1.79 1.79 0 0 1 .384-1.944 1.763 1.763 0 0 1 1.93-.385 1.783 1.783 0 0 1 1.093 1.648 1.78 1.78 0 0 1-1.771 1.78zm1.985 4.523c-.83 0-1.501-.676-1.501-1.51 0-.835.672-1.51 1.5-1.51.83 0 1.501.675 1.501 1.51a1.509 1.509 0 0 1-1.5 1.51zm4.676 1.729c-.723 0-1.31-.59-1.31-1.318 0-.728.587-1.317 1.31-1.317.723 0 1.309.59 1.309 1.317 0 .728-.586 1.318-1.31 1.318zm4.745-2.227a1.062 1.062 0 0 1-1.058-1.066c0-.588.474-1.065 1.058-1.065a1.065 1.065 0 0 1 0 2.131zm1.943-4.926a.871.871 0 0 1-.868-.874c0-.483.389-.874.868-.874a.876.876 0 0 1 .614 1.492.865.865 0 0 1-.614.256zM16.502 8.22a.675.675 0 0 1 1.3-.263c.123.3.02.645-.249.826a.675.675 0 0 1-1.052-.563z" fill="#979797"/>';
      statistics.prepend(svg);
      svgElem = document.querySelector('.svg');
    }

    this.loaderAnim = ()=>{
      i += 3;
      svgElem.setAttributeNS(null, "transform", `rotate(${i})`);
      anim = requestAnimationFrame(this.loaderAnim);
    }

    //остановка лоадера
    this.removeLoader = function(){
      cancelAnimationFrame(anim);
      svgElem.remove();
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
      if(_pageName === 'statistics'){
        this.response();
      }
        myModuleView.renderContent(_pageName);
    }

    this.response = function(){
      setTimeout(() => {
        myModuleView.createLoader();
        requestAnimationFrame(myModuleView.loaderAnim);
      }, 0);
      async function getUsers(){
        try{
            const response = await fetch('http://localhost:9090/users');
            const data = await response.json();
            listUsers(data);

            myModuleView.removeLoader();
        } catch(error){
            console.error("Error:", error);
        }
      }
  
      function listUsers(users){
        const table = document.querySelector('.statistics__table');

        for(let i = 0; i < users.length; i++){
          const tr = document.createElement('tr');
            // for(let elem in users[i]){
            //   const td = document.createElement('td');
            //   td.textContent = users[i][elem];
            //   tr.append(td);
            // }
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            console.log(users[i]);
            td1.textContent = users[i].name;
            td2.textContent = users[i].score;
            tr.append(td1, td2);
          table.append(tr);
        }

        table.classList.add('active');
      }
  
      getUsers();
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
