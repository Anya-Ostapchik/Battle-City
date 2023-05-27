import { BLOCK_WIDTH, BLOCK_HEIGHT, CANVAS_WIDTH, CANVAS_HEIGHT, BULLET_SIZE, EAGLE_SIZE, TANK_SIZE } from "./constants.js";
import { spriteMap } from "./sprite-map.js";

export function View(){
    let ctx = null;
    let image = null;
    let myContent = null;

    this.init = function (content) {
        myContent = content;
        image = new Image();
        image.src = 'img/sprite2.png';
    }

    this.getCanvas = function(){
        ctx = document.querySelector('#canvas').getContext('2d');
    }

    //очистка поля
    this.clearField = () => {
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

    this.changeNumLives = function(num){
        const lives = document.querySelector('.canvas__num_lives');
        lives.textContent = num;
    }

    this.changeNumStage = function(num){
        const stage = document.querySelector('.canvas__stage');
        stage.textContent = num;
    }

    this.deleteTankIcon = function(){
        const tanks = document.querySelector('.canvas__count-tank');
        tanks.lastElementChild.remove();
    }

    //отрисовка карты
    this.drawField = function(elem, x, y, w, h){
        ctx.drawImage(image, ...elem, x, y, w, h);
    }

    //отрисовка орла
    this.drawEagle = function(num){
        ctx.drawImage(image, ...spriteMap[num], 12 * BLOCK_WIDTH, 24 * BLOCK_HEIGHT, EAGLE_SIZE, EAGLE_SIZE);
    }

    //отрисовка танка
    this.drawTank = function (num, x, y){
        ctx.drawImage(image, ...spriteMap[num], x, y, TANK_SIZE, TANK_SIZE);
    }

    //отрисовка пули
    this.drawBullet = (num, x, y) => {
        ctx.drawImage(image, ...spriteMap[num], x, y, BULLET_SIZE, BULLET_SIZE);
    }

    //отрисовка взрыва
    this.drawExplosion = function(num, x, y, w, h){
        ctx.drawImage(image, ...spriteMap[num], x, y, w, h);
    }

    this.gameOver = function(){
        const wrapper = document.querySelector('.canvas__wrapper');
        const txt = document.createElement('p');
        txt.classList.add('game_over');
        txt.textContent = 'GAME OVER';
        wrapper.append(txt);
    }

    this.showScoring = function(num, score){
        const scoring = document.querySelector('.score');
        scoring.classList.add('score__active');
        const stage = document.querySelector('#scoring__stage_num');
        stage.textContent = num;
        const totalScore = document.querySelector('.scoring__total_score');
        totalScore.textContent = score;
    }

    this.hideScoring = function(){
        const scoring = document.querySelector('.score');
        scoring.classList.remove('score__active');
    }    
}