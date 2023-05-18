const HomePage = {
  title: "Battle City",
  render: () => {
    return `
      <section class="menu" id="menu">
        <div class="img__wrapper"></div>     
        <ul id="mainmenu">
          <li id="player_one"><a class="list" href="#game">1 PLAYER</a></li>
          <li id="statistics"><a class="list" href="#statistics">STATISTICS</a></li>
          <li id="rules"><a class="list" href="#rules">RULES</a></li>
        </ul>        
      </section>
    `;
  }
};

export default HomePage;
