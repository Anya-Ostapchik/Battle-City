import Player from "./player.js";
import BulletController from "./bulletController.js";

const canvas = document.querySelector('#canvas');

const bulletController = new BulletController(canvas);
const player = new Player(
  canvas.width / 2.2,
  canvas.height / 1.3,
  bulletController
);
function gameLoop() {
    setCommonStyle();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    bulletController.draw(ctx);
    player.draw(ctx);
}

setInterval(gameLoop, 1000 / 60);
