import HomePage from "./Pages/HomePage.js";
import Statistics from "./Pages/Statistics.js";
import Rules from "./Pages/Rules.js";
import Level from "./Pages/Level.js";
import Game from "./Pages/Game.js";
import Authorization from "./Pages/Authorization.js";
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
  authorization: Authorization,
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

      if(_hashPageName === 'authorization'){
        const input = document.querySelector('.input__name');
        const btn = document.querySelector('.btn');
        btn.addEventListener('click', function (e){
            e.preventDefault();
            localStorage.setItem('PlayerName', input.value)
            location.hash = '#main';
        });
      }

      if(_hashPageName === 'game'){
        const level = document.querySelector('.level');
        level.classList.add('level_active');

        let i = 0;

        const id = setInterval(() => {
          i++;
          if(i === 2){
            soundStageStart.play();
          }
          if(i === 5){
            level.classList.remove('level_active');
            clearInterval(id);
          }
        }, 1000);
      }
    }

    this.createLoader = function(){
      const statistics = document.querySelector('#statistics__content');
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
      if(localStorage.getItem('PlayerName') === null){
        location.hash = '#authorization';
        _pageName = 'authorization';
      }else if(localStorage.getItem('PlayerName') !== null && sessionStorage.getItem("is_reloaded")){
        location.hash = '#main';
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
        const statistics = document.querySelector('.statistics');

          if(users.length === 0){
            const tableMain = document.createElement('table');
            tableMain.classList.add('statistics__table');
            const trMain = document.createElement('tr');
            const th1 = document.createElement('th');
            th1.textContent = 'Name';
            const th2 = document.createElement('th');
            th2.textContent = 'Points';
            trMain.append(th1, th2);
            tableMain.append(trMain);
            statistics.prepend(tableMain);
          }else if(users.length <= 5){
            const tableMain = document.createElement('table');
            tableMain.classList.add('statistics__table');
            const trMain = document.createElement('tr');
            const th1 = document.createElement('th');
            th1.textContent = 'Name';
            const th2 = document.createElement('th');
            th2.textContent = 'Points';
            trMain.append(th1, th2);
            tableMain.append(trMain);

            for(let i = users.length - 1; i >= 0; i--){
              const tr = document.createElement('tr');
              const td1 = document.createElement('td');
              const td2 = document.createElement('td');
              td1.textContent = users[i].name;
              td2.textContent = users[i].score;
              tr.append(td1, td2);
              tableMain.append(tr);
            }

            statistics.prepend(tableMain);
          }else{
            const tableMain = document.createElement('table');
            tableMain.classList.add('statistics__table');

            const trMain = document.createElement('tr');

            const td1 = document.createElement('td');
            const table1 = document.createElement('table');
            table1.classList.add('nested-table');

            const tr = document.createElement('tr');
            const th1 = document.createElement('th');
            th1.textContent = 'Name';
            const th2 = document.createElement('th');
            th2.textContent = 'Points';
            tr.append(th1, th2);
            table1.append(tr);

            for(let i = users.length - 1; i > users.length - 1 - 5; i--){
              const tr1 = document.createElement('tr');
              const td1 = document.createElement('td');
              const td2 = document.createElement('td');
              td1.textContent = users[i].name;
              td2.textContent = users[i].score;
              tr1.append(td1, td2);
              table1.append(tr1);
            }
            td1.append(table1);

            const td2 = document.createElement('td');
            const table2 = document.createElement('table');
            table2.classList.add('nested-table');
            const tr2 = document.createElement('tr');
            const th3 = document.createElement('th');
            th3.textContent = 'Name';
            const th4 = document.createElement('th');
            th4.textContent = 'Points';
            tr2.append(th3, th4);
            table2.append(tr2);

            for(let i = users.length - 1 - 5; i > users.length - 1 - 10; i--){
              const tr2 = document.createElement('tr');
              const td1 = document.createElement('td');
              const td2 = document.createElement('td');
              td1.textContent = users[i].name;
              td2.textContent = users[i].score;
              tr2.append(td1, td2);
              table2.append(tr2);
            }
            td2.append(table2);

            trMain.append(td1, td2);
            tableMain.append(trMain)

            statistics.prepend(tableMain);
        }
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

      window.addEventListener("hashchange", this.updateState);

      window.addEventListener('click', function (){
        sessionStorage.removeItem("is_reloaded");
      });

      myModuleContainer.querySelector("#mainmenu").addEventListener("click", function (event) {
        event.preventDefault();
        window.location.hash = event.target.getAttribute("href");
      });

      window.onbeforeunload = function() {
        return false;
      };

      this.updateState();
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
      
      this.renderComponents(root, components);

      const view = new ModuleView();
      const model = new ModuleModel();
      const controller = new ModuleController();

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
