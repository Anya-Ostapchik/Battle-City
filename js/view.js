import { settings, BLOCK_WIDTH, BLOCK_HEIGHT, CANVAS_WIDTH, CANVAS_HEIGHT, BULLET_SIZE, EXPLOSION_SIZE } from "./settings.js";
import { spriteMap } from "./sprite-map.js";
// import { levels } from "./levels.js";

export function View(){
    let myMenu = null;
    let myCanvas = null;
    let ctx = null;
    let image = null;

    this.init = function (menu, canvas) {
        myMenu = menu;
        myCanvas = canvas;
        ctx = canvas.getContext('2d');

        image = new Image();
        image.src = 'img/sprite2.png';

        menu.style.top = '100%';

        window.addEventListener('load', function (){
            window.scrollTo(0, 0);
            menu.style.top = '50%';
            menu.style.transform = 'translate(-50%, -50%)';
        });
    }

    //очистка поля
    this.clearField = function () {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    //отрисовка того количества значков(танков), которые должны появиться на поле
    this.drawRemainingTanks = function(){
        const tanks = document.querySelector('.canvas__count-tank');

        for (let i = 0; i < 20; i++) {
            const tank = document.createElement('span');
            tank.classList.add('canvas__new_tank');
            tanks.append(tank);
        }
    }

    //отрисовка карты
    this.drawField = function(elem, x, y, w, h){
        ctx.drawImage(image, ...elem, x, y, w, h);
    }

    //отрисовка орла
    this.drawEagle = function(){
        ctx.drawImage(image, 4 * 32, 9 * 32, 32, 32, 13 * BLOCK_WIDTH, 24 * BLOCK_HEIGHT, BLOCK_WIDTH, BLOCK_HEIGHT);
    }

    //отрисовка танка
    this.drawPlayerOne = function (direction){
        ctx.drawImage(image, ...spriteMap[direction], settings.playerOnePosX, settings.playerOnePosY, settings.tankSize, settings.tankSize);
    }

    //отрисовка пули
    this.drawPlayerOneBullet = (num, x, y) => {
        ctx.drawImage(image, ...spriteMap[num], x, y, BULLET_SIZE, BULLET_SIZE);
    }

    //отрисовка взрыва
    this.drawExplosion = function(num, x, y){
        ctx.drawImage(image, ...spriteMap[num], x, y, EXPLOSION_SIZE, EXPLOSION_SIZE);
    }
    // this.drawEnemyTanks = function(){
        
    // }
}