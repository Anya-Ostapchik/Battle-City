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
        const menu = document.querySelector('#menu');
        
        window.addEventListener('load', function (){
            menu.style.top = '50%';
            menu.style.transform = 'translate(0, -50%)';
        });

        menu.style.top = '100%';
    }

    this.getCanvas = function(){
        ctx = document.querySelector('#canvas').getContext('2d');
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
    this.drawPlayerOne = function (direction, x, y){
        ctx.drawImage(image, ...spriteMap[direction], x, y, TANK_SIZE, TANK_SIZE);
    }

    //отрисовка пули drawBullet
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

        // setTimeout(() => {
        //     this.showScoring();
        // }, 1000);
    }

    this.drawEnemyTanks = function(num, x, y){
        ctx.drawImage(image, ...spriteMap[num], x, y, TANK_SIZE, TANK_SIZE);
    }

    this.showScoring = function(){
        const scoring = document.createElement('section');
        scoring.classList.add('scoring');
        const stageTxt = document.createElement('p');
        stageTxt.textContent = 'STAGE';
        stageTxt.classList.add('scoring__stage_txt');
        const stageNum = document.createElement('span');
        // stageNum.textContent = level;
        stageNum.classList.add('scoring__stage_num');
        const player = document.createElement('p');
        player.classList.add('scoring__player');
        const totalScore = document.createElement('p');
        totalScore.classList.add('scoring__total_score');

        const score = document.createElement('div');
        score.classList.add('score');

        const killedTank = document.createElement('div');
        killedTank.classList.add('killed_tank');
        const killedTankOne = document.createElement('p');
        killedTankOne.classList.add('killed_tank_one');
        const killedTankTwo = document.createElement('p');
        killedTankTwo.classList.add('killed_tank_two');
        const killedTankThree = document.createElement('p');
        killedTankThree.classList.add('killed_tank_three');
        const killedTankFore = document.createElement('p');
        killedTankFore.classList.add('killed_tank_fore');

        killedTank.append(killedTankOne, killedTankTwo, killedTankThree, killedTankFore);

        const elems = document.createElement('div');
        elems.classList.add('elems');

        for (let i = 0; i < 4; i++) {
            const elem = document.createElement('p');
            elem.classList.add('elem');
            elem.innerHTML = '<svg id="count-kill-tank_one"  width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="16" y="8" width="11" height="5" transform="rotate(-180 16 8)" fill="white"/> <path d="M7.21238e-07 5.5L5.25 0.736861L5.25 10.2631L7.21238e-07 5.5Z" fill="white"/> </svg>';

            elems.append(elem);
        }

        const img = document.createElement('div');
        img.classList.add('kill_tank_img');

        const imgOne = document.createElement('div');
        imgOne.classList.add('kill_tank_one_img', 'kill_tank_img');
        const imgTwo = document.createElement('div');
        imgTwo.classList.add('kill_tank_two_img', 'kill_tank_img');
        const imgThree = document.createElement('div');
        imgThree.classList.add('kill_tank_three_img', 'kill_tank_img');
        const imgFore = document.createElement('div');
        imgFore.classList.add('kill_tank_fore_img', 'kill_tank_img');

        img.append(imgOne, imgTwo, imgThree, imgFore);
        score.append(killedTank, elems, img);
        scoring.append(stageTxt, stageNum, player, totalScore, score);

        myContent.append(scoring);
    }

    
}