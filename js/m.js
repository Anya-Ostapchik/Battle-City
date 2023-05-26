import { levels } from "./levels.js";
import { spriteMap } from "./sprite-map.js";
import { BLOCK_WIDTH, BLOCK_HEIGHT, CANVAS_HEIGHT, CANVAS_WIDTH, BULLET_SIZE, EXPLOSION_SIZE, EAGLE_SIZE, TANK_SIZE, MEASUREMENT_ERROR, BONUS_SIZE } from "./constants.js";
import { Enemies } from "./e.js";
import { Bullet } from "./b.js";


export function Model(){
    this.key = 'ArrowUp'; //направление танка
    this.level = 1; //номер уровня
    this.numLives = 2; //количество жизней
    this.i = 15; //счетчик для взрыва
    this.countStar = 0;
    this.blocks = [];
    this.collision = false;
    this.eagleState = 20;
    this.playerSpeedX = 0;
    this.playerSpeedY = 0;
    this.isMoving = false;
    this.isShoots = false;
    this.animation = false;
    this.game = false;
    this.Enemies = null;
    this.countTanks = 0; //количество танков на поле
    this.k = 1; //счетчик для позиции врагов
    this.enemiesPosY = 0;
    this.enemiesPos = []; //массив для хранения позиций всех танков врагов
    this.allEnemiesTanks = 0; //количество всех созданных танков
    this.enemies = []; //массив с врагами, которые сейчас на поле
    this.dt = 0; //счетчик для количества убитых танков
    this.score = 0;
    
    this.init = function(view){
        this.myView = view;
        this.bullet = new Bullet();
        this.bullet.init(this.myView, this, 'player', 4, 500);


        this.soundStageStart = new Audio('sound/sound_stage_start.ogg');
        this.soundShoot = new Audio('sound/sound_bullet_shot.ogg');
        this.soundBulletHit1 = new Audio('sound/sound_bullet_hit_1.ogg');
        this.soundBulletHit2 = new Audio('sound/sound_bullet_hit_2.ogg');
        this.soundExplosion1 = new Audio('sound/sound_explosion_1.ogg'); //взрыв танка
        this.soundExplosion2 = new Audio('sound/sound_explosion_2.ogg'); //взрыв орла
        this.soundGameOver = new Audio('sound/sound_game_over.ogg');
        this.soundMovement = new Audio('sound/sound-movement.ogg');
        this.soundMovement.loop = true;
        this.soundMotor = new Audio('sound/sound_motor.ogg');
        this.soundMotor.loop = true;
        this.soundMotor.volume = 0.2;
    }

    this.getCanvas = function () {
        this.myView.getCanvas();
    }
    
    this.field = () => {
        for(let i = 0; i < this.blocks.length; i++){
            this.myView.drawField(spriteMap[this.blocks[i].material], this.blocks[i].x, this.blocks[i].y, this.blocks[i].width, this.blocks[i].height);
        }
        requestAnimationFrame(this.field);
    }

    this.drawEagle = () => {
        this.myView.drawEagle(this.eagleState);
        this.animEagle = requestAnimationFrame(this.drawEagle);
    }

    this.getElemsMap = function(){
        for (let i = 0; i < levels[this.level - 1].map.length; i++) {
            for (let j = 0; j < levels[this.level - 1].map[i].length; j++) {
                if(levels[this.level - 1].map[i][j]){
                    this.blocks.push({x: j * BLOCK_WIDTH, y: i * BLOCK_HEIGHT, material: levels[this.level - 1].map[i][j], width: BLOCK_WIDTH, height: BLOCK_HEIGHT});
                }
            }
        }
    }

    this.gameStartOnePlayer = function(){
        if(this.mainAnimId){
            cancelAnimationFrame(this.mainAnimId);
            this.blocks = [];
            this.enemiesPos = [];
            this.dt = 0;
            this.allEnemiesTanks = 0;
            this.countTanks = 0;
            this.numLives = 2;
        }

        this.playerX = 9 * BLOCK_WIDTH;
        this.playerY = CANVAS_HEIGHT - TANK_SIZE;

        this.getElemsMap();
        this.myView.drawRemainingTanks();
        this.start();
        requestAnimationFrame(this.drawEnemyTanks);
        requestAnimationFrame(this.field);
    }

    this.drawEnemyTanks = () => {
        this.enemyAnimId = requestAnimationFrame(this.drawEnemyTanks);

        if(this.countTanks <= 4){
            if(this.k === 1){
                this.enemiesPosX = 0;
                this.k++;
            }else if(this.k === 2){
                this.enemiesPosX = CANVAS_WIDTH / 2 - TANK_SIZE;
                this.k++;
            }else if(this.k === 3){
                this.enemiesPosX = CANVAS_WIDTH - TANK_SIZE;
                this.k = 1;
            }

            this.allEnemiesTanks++;

            this.enemies.push(new Enemies());

            this.enemies[this.countTanks].init(this.myView, this, this.enemiesPosX, this.enemiesPosY, this.level, this.blocks, this.allEnemiesTanks);

            this.countTanks++;

            this.myView.deleteTankIcon();
        }

        if(this.allEnemiesTanks >= 20){
            cancelAnimationFrame(this.enemyAnimId);
        }
    }

    this.getEnemisPos = function(){
        for (let i = 0; i < this.countTanks; i++) {
            this.enemiesPos[i] = this.enemies[i].giveEnemiesPos();
            this.enemies[i].getPlayerPos(this.playerX, this.playerY);
        }
    }

    this.nextLevel = function(){
        this.soundMotor.play();
        this.soundMovement.play();
        this.level++;
        this.myView.changeNumLives(this.level);
        this.gameStartOnePlayer();
    }
    
    this.revivalPlayer = function(){
        this.numLives--;

        if(this.numLives <= 0){
            this.gameOver();
        }

        this.myView.changeNumLives(this.numLives);


        this.playerX = 9 * BLOCK_WIDTH;
        this.playerY = CANVAS_HEIGHT - TANK_SIZE;
    }

    this.tankKilled = function(i){
        this.dt++;

        this.enemiesPos.splice([i], 1);
        this.enemies[i].delete();
        this.enemies.splice([i], 1);

        this.countTanks--;
        this.score += 200;
        this.enemyAnimId = requestAnimationFrame(this.drawEnemyTanks);
    }


    this.checkCollisionTank = function(){
        switch (this.key) {
            case 'ArrowUp':
                for(let i = 0; i < this.enemiesPos.length; i++){
                    if(this.playerX + TANK_SIZE >= this.enemiesPos[i].x && this.playerX <= this.enemiesPos[i].x + TANK_SIZE && this.playerY <= this.enemiesPos[i].y + TANK_SIZE && this.playerY >= this.enemiesPos[i].y){
                        this.playerSpeedY = 0;
                    }
                }
                
                this.blocks.find(item => {
                    if(item.material !== 42 && this.playerX + TANK_SIZE > item.x + MEASUREMENT_ERROR && this.playerX < item.x + BLOCK_WIDTH - MEASUREMENT_ERROR && this.playerY === item.y + BLOCK_HEIGHT - MEASUREMENT_ERROR){
                        this.playerSpeedY = 0;
                    }
                })
                
                //столкновение с границами карты
                if(this.playerY < 0){
                    this.playerSpeedY = 0;
                }
                break;
        
            case 'ArrowDown':
                for(let i = 0; i < this.enemiesPos.length; i++){
                    if(this.playerX + TANK_SIZE >= this.enemiesPos[i].x && this.playerX <= this.enemiesPos[i].x + TANK_SIZE && this.playerY + TANK_SIZE >= this.enemiesPos[i].y && this.playerY + TANK_SIZE <= this.enemiesPos[i].y + TANK_SIZE){
                        this.playerSpeedY = 0;
                    }
                }

                this.blocks.find(item => {
                    if(item.material !== 42 && this.playerX + TANK_SIZE > item.x + MEASUREMENT_ERROR && this.playerX < item.x + BLOCK_WIDTH - MEASUREMENT_ERROR && this.playerY + TANK_SIZE === item.y + MEASUREMENT_ERROR){
                        this.playerSpeedY = 0;
                    }
                })

                //столкновение с орлом
                if(this.playerX + TANK_SIZE > 12 * BLOCK_WIDTH + MEASUREMENT_ERROR && this.playerX < 12 * BLOCK_WIDTH + EAGLE_SIZE - MEASUREMENT_ERROR && this.playerY + TANK_SIZE === 24 * BLOCK_HEIGHT + MEASUREMENT_ERROR){
                    this.playerSpeedY = 0;
                }

                //столкновение с границами карты
                if(this.playerY > CANVAS_HEIGHT - TANK_SIZE){
                    this.playerSpeedY = 0;
                }
                break;
        
            case 'ArrowLeft':
                for(let i = 0; i < this.enemiesPos.length; i++){
                    if(this.playerX <= this.enemiesPos[i].x + TANK_SIZE && this.playerX >= this.enemiesPos[i].x && this.playerY + TANK_SIZE >= this.enemiesPos[i].y && this.playerY <= this.enemiesPos[i].y + TANK_SIZE){
                        this.playerSpeedX = 0;
                    }
                }

                this.blocks.find(item => {
                    if(item.material !== 42 && this.playerX === item.x + BLOCK_WIDTH - MEASUREMENT_ERROR && this.playerY + TANK_SIZE > item.y + MEASUREMENT_ERROR && this.playerY < item.y + BLOCK_HEIGHT - MEASUREMENT_ERROR){
                        this.playerSpeedX = 0;
                    }
                })

                //столкновение с орлом
                if(this.playerX === 12 * BLOCK_WIDTH + EAGLE_SIZE - MEASUREMENT_ERROR && this.playerY + TANK_SIZE > 24 * BLOCK_HEIGHT + MEASUREMENT_ERROR && this.playerY < 24 * BLOCK_HEIGHT + EAGLE_SIZE - MEASUREMENT_ERROR){
                    this.playerSpeedX = 0;
                }

                //столкновение с границами карты
                if(this.playerX < 0){
                    this.playerSpeedX = 0;
                }
                break;
        
            case 'ArrowRight':
                for(let i = 0; i < this.enemiesPos.length; i++){
                    if(this.playerX + TANK_SIZE >= this.enemiesPos[i].x && this.playerX + TANK_SIZE <= this.enemiesPos[i].x + TANK_SIZE && this.playerY + TANK_SIZE >= this.enemiesPos[i].y && this.playerY <= this.enemiesPos[i].y + TANK_SIZE){
                        this.playerSpeedX = 0;
                    }
                }

                this.blocks.find(item => {
                    if(item.material !== 42 && this.playerX + TANK_SIZE === item.x + MEASUREMENT_ERROR && this.playerY + TANK_SIZE > item.y + MEASUREMENT_ERROR && this.playerY < item.y + BLOCK_HEIGHT - MEASUREMENT_ERROR){
                        this.playerSpeedX = 0;
                    }
                })
                
                //столкновение с орлом
                if(this.playerX + TANK_SIZE === 12 * BLOCK_WIDTH + MEASUREMENT_ERROR && this.playerY + TANK_SIZE > 24 * BLOCK_HEIGHT + MEASUREMENT_ERROR && this.playerY < 24 * BLOCK_HEIGHT + EAGLE_SIZE - MEASUREMENT_ERROR){
                    this.playerSpeedX = 0;
                }
                
                //столкновение с границами карты
                if(this.playerX > CANVAS_WIDTH - TANK_SIZE){
                    this.playerSpeedX = 0;
                }
                break;
        
            default:
                break;
        }
    }

    this.playerOneKeydown = function(){
        if(this.isMoving && !this.game){
            this.soundMovement.play();
            this.soundMotor.pause();
            switch (this.key) {
                case 'ArrowUp':
                    this.playerSpeedY = -2;
                    this.playerSpeedX = 0;

                    this.checkCollisionTank();
                    
                    this.playerY += this.playerSpeedY;

                    this.myView.drawPlayerOne(7, this.playerX, this.playerY);
                    break;
                case 'ArrowDown':
                    this.playerSpeedY = 2;
                    this.playerSpeedX = 0;

                    this.checkCollisionTank();

                    this.playerY += this.playerSpeedY;

                    this.myView.drawPlayerOne(9, this.playerX, this.playerY);
                    break;
                case 'ArrowLeft':
                    this.playerSpeedX = -2;
                    this.playerSpeedY = 0;

                    this.checkCollisionTank();

                    this.playerX += this.playerSpeedX;

                    this.myView.drawPlayerOne(10, this.playerX, this.playerY);
                    break;
                case 'ArrowRight':
                    this.playerSpeedX = 2;
                    this.playerSpeedY = 0;

                    this.checkCollisionTank();

                    this.playerX += this.playerSpeedX;

                    this.myView.drawPlayerOne(8, this.playerX, this.playerY);
                    break;
                default:
                    break;
            }
        } 
        else if(!this.isMoving && !this.game){
            this.soundMotor.play();
            this.soundMovement.pause();
            switch (this.key) {
                case 'ArrowUp':
                    this.playerSpeedY = 0;
                    this.myView.drawPlayerOne(7, this.playerX, this.playerY);
                    break;
                case 'ArrowDown':
                    this.playerSpeedY = 0;
                    this.myView.drawPlayerOne(9, this.playerX, this.playerY);
                    break;
                case 'ArrowLeft':
                    this.playerSpeedX = 0;
                    this.myView.drawPlayerOne(10, this.playerX, this.playerY);
                    break;
                case 'ArrowRight':
                    this.playerSpeedX = 0;
                    this.myView.drawPlayerOne(8, this.playerX, this.playerY);
                    break;
                default:
                    break;
            } 
        }
    }

    // this.showBonuses = function(){
    //     this.posX = Math.floor(Math.random() * (CANVAS_WIDTH - BONUS_SIZE - 0 + 1)) + 0;
    //     this.posY = Math.floor(Math.random() * (CANVAS_HEIGHT - BONUS_SIZE - 0 + 1)) + 0;

    //     this.bonus = Math.floor(Math.random() * (73 - 69 + 1)) + 69;

    //     this.myView.drawBonus(this.bonus, this.posX, this.posY);
    // }

    // this.drawExplosion = () => {
    //     let animId = null;
        
    //     switch (this.key) {
    //         case 'ArrowUp':
    //             if(this.i < 18){
    //                 this.myView.drawExplosion(this.i, this.bulletX - BULLET_SIZE, this.bulletY - BLOCK_WIDTH / 4, EXPLOSION_SIZE, EXPLOSION_SIZE);
    //             } else{
    //                 this.myView.drawExplosion(this.i, this.bulletX - BULLET_SIZE, this.bulletY - BLOCK_WIDTH / 4, EXPLOSION_SIZE * 2, EXPLOSION_SIZE * 2);
    //             }
    //             break;
    //         case 'ArrowLeft':
    //             if(this.i < 18){
    //                 this.myView.drawExplosion(this.i, this.bulletX - BLOCK_WIDTH / 4, this.bulletY - BULLET_SIZE, EXPLOSION_SIZE, EXPLOSION_SIZE);
    //             } else{
    //                 this.myView.drawExplosion(this.i, this.bulletX - BLOCK_WIDTH / 4, this.bulletY - BULLET_SIZE, EXPLOSION_SIZE * 2, EXPLOSION_SIZE * 2);
    //             }
    //             break;
    //         case 'ArrowDown':
    //             if(this.i < 18){
    //                 this.myView.drawExplosion(this.i, this.bulletX - BULLET_SIZE / 2, this.bulletY - BLOCK_WIDTH / 4, EXPLOSION_SIZE, EXPLOSION_SIZE);
    //             } else{
    //                 this.myView.drawExplosion(this.i, this.bulletX - BULLET_SIZE / 2, this.bulletY - BLOCK_WIDTH / 4, EXPLOSION_SIZE * 2, EXPLOSION_SIZE * 2);
    //             }
    //             break;
    //         case 'ArrowRight':
    //             if(this.i < 18){
    //                 this.myView.drawExplosion(this.i, this.bulletX + BLOCK_WIDTH / 4, this.bulletY - BLOCK_WIDTH / 2, EXPLOSION_SIZE, EXPLOSION_SIZE);
    //             } else{
    //                 this.myView.drawExplosion(this.i, this.bulletX + BLOCK_WIDTH / 4, this.bulletY - BLOCK_WIDTH / 2, EXPLOSION_SIZE * 2, EXPLOSION_SIZE * 2);
    //             }
    //             break;
    //         default:
    //             break;
    //     }

    //     if(this.animation){
    //         animId = requestAnimationFrame(this.drawExplosion);
    //     } else{
    //         cancelAnimationFrame(animId);
    //     }
    // }

    // this.explosion = function(i, music){
    //     this.animation = true;

    //     let animId = requestAnimationFrame(this.drawExplosion);
    //     const interval = setInterval(() => {
    //         cancelAnimationFrame(animId);

    //         if(this.animation){
    //             animId = requestAnimationFrame(this.drawExplosion);
    //         } else{
    //             cancelAnimationFrame(animId);
    //         }

    //         this.i++;

    //         if(this.i > i){
    //             cancelAnimationFrame(animId);
    //             this.animation = false;
    //             this.i = 15;
    //             clearInterval(interval);
    //         }
    //     }, 100);

    //     music.play();
    // }

    this.playerOneShiftKeydown = () => {
        // this.bullet.init(this.myView, this, 'player', this.key, this.playerX, this.playerY, 4, 500, this.blocks, this.enemiesPos);

        this.bullet.getParams(this.key, this.playerX, this.playerY, this.blocks, this.enemiesPos)

        if(this.isShoots){
            this.bullet.setPosBullet();
        }
    }
    
    this.gameOver = () => {
        this.eagleState = 21;
        this.soundMotor.pause();
        this.soundMovement.pause();
        this.game = true;
        
        this.soundGameOver.play();
        this.myView.gameOver();

        setTimeout(() => {
            this.myView.showScoring(this.level, this.score);
        }, 1000);

        setTimeout(() => {
            location.reload();
        }, 3000);
    }

    this.start = function(){
        this.id = requestAnimationFrame(this.loop);
    }

    this.loop = () => {
        this.myView.clearField();
        this.playerOneKeydown();
        this.getEnemisPos();
        this.drawEagle();

        this.mainAnimId = requestAnimationFrame(this.loop);

        if(this.dt === 20){
            // this.soundMotor.pause();
            // this.soundMovement.pause();
            cancelAnimationFrame(this.mainAnimId);
            this.blocks = [];
            this.enemiesPos = [];
            this.dt = 0;
            this.allEnemiesTanks = 0;
            this.countTanks = 0;
            setTimeout(() => {
                this.myView.showScoring(this.level, this.score);
            }, 100);
            setTimeout(() => {
                this.myView.hideScoring(this.level, this.score);
                this.nextLevel();
            }, 3000);
        }
    }
}