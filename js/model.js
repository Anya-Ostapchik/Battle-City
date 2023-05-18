import { levels } from "./levels.js";
import { spriteMap } from "./sprite-map.js";
import { BLOCK_WIDTH, BLOCK_HEIGHT, CANVAS_HEIGHT, CANVAS_WIDTH, BULLET_SIZE, EXPLOSION_SIZE, EAGLE_SIZE, TANK_SIZE, MEASUREMENT_ERROR} from "./constants.js";


export function Model(){
    let myView = null;
    this.key = 'ArrowUp';
    this.level = 1;
    this.i = 15;
    this.countStar = 0;
    this.bulletY = 0;
    this.bulletX = 0;
    this.timer = true;
    this.blocks = [];
    this.bullet = false;
    this.bulletDirection = null;
    this.speedBylletY = 0;
    this.speedBylletX = 0;
    this.collision = false;
    this.eagleState = 20;
    this.playerSpeedX = 0;
    this.playerSpeedY = 0;
    this.playerX = 9 * BLOCK_WIDTH;
    this.playerY = CANVAS_HEIGHT - TANK_SIZE;
    this.isMoving = false;
    this.isShoots = false;
    this.animation = false;
    this.game = false;
    this.countEnemyTanks = 0;
    this.allEnemyTanks = 0;
    this.direction = null;
    this.pos = 1;
    // this.createTank

    
    this.init = function(view){
        myView = view;

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

        this.getElemsMap();
    }

    this.getCanvas = function () {
        myView.getCanvas();
    }
    
    this.field = function(){
        for(let i = 0; i < this.blocks.length; i++){
            myView.drawField(spriteMap[this.blocks[i].material], this.blocks[i].x, this.blocks[i].y, this.blocks[i].width, this.blocks[i].height);
        }
        myView.drawEagle(this.eagleState);
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
        this.getRandomDirection();
        this.start();
        myView.drawRemainingTanks();
    }

    this.getRandomDirection = function(){
        for(let i = 0; i <= this.allEnemyTanks; i++){
            if(levels[this.level - 1].enemies[i] === 0){
                this.direction = Math.floor(Math.random() * (29 - 26 + 1)) + 26;
            }
        }
    }

    this.drawEnemyTanks = function(){
        let posX = null;
        let posY = null;
        let pos = 1;
        // let i = 0;
        // if(this.countEnemyTanks === 0){
        //     const intervalId = setInterval(() => {
        //         console.log(i);
        //         if(i >= 4){
        //             clearInterval(intervalId);
        //         }
                if(pos === 1){
                    posX = 0;
                    posY = 0;
                    myView.drawEnemyTanks(this.direction, posX, posY);
                    pos++;
                } else if(pos === 2){
                    posX = CANVAS_WIDTH / 2 - TANK_SIZE / 2;
                    myView.drawEnemyTanks(this.direction, posX, posY);
                    posY = 0;
                    pos++;
                }else if(pos === 3){
                    posX = CANVAS_WIDTH - TANK_SIZE / 2;
                    myView.drawEnemyTanks(this.direction, posX, posY);
                    posY = 0;
                    pos = 0;
                }
        //         i++;
        //     }, 1000);
        // }
        
        
        if(this.countEnemyTanks < 4){
        }
    }

    this.checkCollisionTank = function(){
        switch (this.key) {
            case 'ArrowUp':
                this.blocks.find(item => {
                    if(this.playerX + TANK_SIZE > item.x + MEASUREMENT_ERROR && this.playerX < item.x + BLOCK_WIDTH - MEASUREMENT_ERROR && this.playerY === item.y + BLOCK_HEIGHT - MEASUREMENT_ERROR){
                        this.playerSpeedY = 0;
                    }
                })
                
                //столкновение с границами карты
                if(this.playerY < 0){
                    this.playerSpeedY = 0;
                }
                break;
        
            case 'ArrowDown':
                this.blocks.find(item => {
                    if(this.playerX + TANK_SIZE > item.x + MEASUREMENT_ERROR && this.playerX < item.x + BLOCK_WIDTH - MEASUREMENT_ERROR && this.playerY + TANK_SIZE === item.y + MEASUREMENT_ERROR){
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
                this.blocks.find(item => {
                    if(this.playerX === item.x + BLOCK_WIDTH - MEASUREMENT_ERROR && this.playerY + TANK_SIZE > item.y + MEASUREMENT_ERROR && this.playerY < item.y + BLOCK_HEIGHT - MEASUREMENT_ERROR){
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
                this.blocks.find(item => {
                    if(this.playerX + TANK_SIZE === item.x + MEASUREMENT_ERROR && this.playerY + TANK_SIZE > item.y + MEASUREMENT_ERROR && this.playerY < item.y + BLOCK_HEIGHT - MEASUREMENT_ERROR){
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

                    myView.drawPlayerOne(7, this.playerX, this.playerY);
                    break;
                case 'ArrowDown':
                    this.playerSpeedY = 2;
                    this.playerSpeedX = 0;

                    this.checkCollisionTank();

                    this.playerY += this.playerSpeedY;

                    myView.drawPlayerOne(9, this.playerX, this.playerY);
                    break;
                case 'ArrowLeft':
                    this.playerSpeedX = -2;
                    this.playerSpeedY = 0;

                    this.checkCollisionTank();

                    this.playerX += this.playerSpeedX;

                    myView.drawPlayerOne(10, this.playerX, this.playerY);
                    break;
                case 'ArrowRight':
                    this.playerSpeedX = 2;
                    this.playerSpeedY = 0;

                    this.checkCollisionTank();

                    this.playerX += this.playerSpeedX;

                    myView.drawPlayerOne(8, this.playerX, this.playerY);
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
                    myView.drawPlayerOne(7, this.playerX, this.playerY);
                    break;
                case 'ArrowDown':
                    this.playerSpeedY = 0;
                    myView.drawPlayerOne(9, this.playerX, this.playerY);
                    break;
                case 'ArrowLeft':
                    this.playerSpeedX = 0;
                    myView.drawPlayerOne(10, this.playerX, this.playerY);
                    break;
                case 'ArrowRight':
                    this.playerSpeedX = 0;
                    myView.drawPlayerOne(8, this.playerX, this.playerY);
                    break;
                default:
                    break;
            } 
        }
    }

    this.drawExplosion = () => {
        let animId = null;

        switch (this.key) {
            case 'ArrowUp':
            case 'ArrowLeft':
                if(this.i < 18){
                    myView.drawExplosion(this.i, this.bulletX - BULLET_SIZE / 2, this.bulletY - BULLET_SIZE / 2, EXPLOSION_SIZE, EXPLOSION_SIZE);
                } else{
                    myView.drawExplosion(this.i, this.bulletX - BULLET_SIZE / 2, this.bulletY - BULLET_SIZE / 2, EXPLOSION_SIZE * 2, EXPLOSION_SIZE * 2);
                }
                break;
            case 'ArrowDown':
            case 'ArrowRight':
                if(this.i < 18){
                    myView.drawExplosion(this.i, this.bulletX - EXPLOSION_SIZE / 2, this.bulletY - EXPLOSION_SIZE / 2, EXPLOSION_SIZE, EXPLOSION_SIZE);
                } else{
                    myView.drawExplosion(this.i, this.bulletX - EXPLOSION_SIZE / 2, this.bulletY - EXPLOSION_SIZE / 2, EXPLOSION_SIZE * 2, EXPLOSION_SIZE * 2);
                }
                break;
            default:
                break;
        }

        if(this.animation){
            animId = requestAnimationFrame(this.drawExplosion);
        } else{
            cancelAnimationFrame(animId);
        }
    }

    this.explosion = function(i, music){
        this.animation = true;

        let animId = requestAnimationFrame(this.drawExplosion);
        const interval = setInterval(() => {
            cancelAnimationFrame(animId);

            if(this.animation){
                animId = requestAnimationFrame(this.drawExplosion);
            } else{
                cancelAnimationFrame(animId);
            }

            this.i++;

            if(this.i > i){
                cancelAnimationFrame(animId);
                this.animation = false;
                this.i = 15;
                clearInterval(interval);
            }
        }, 100);

        this.bullet = false;
        music.play();
    }

    //столкновение пули, когда она летит влево
    this.checkCollisionBulletLeft = function(id){
        this.blocks.find(item => {
            if(this.bulletY + BULLET_SIZE >= item.y && this.bulletY <= item.y + item.height && this.bulletX + BULLET_SIZE >= item.x && this.bulletX <= item.x + item.width){

                cancelAnimationFrame(id);

                this.explosion(17, this.soundBulletHit2);

                if(item.material !== 2){
                    if(item.material === 4){
                        item.material = 24;

                        item.width = 16;
                        item.height = 12;
                    }else if(item.material === 5){
                        item.material = 25;
                        
                        item.width = 16;
                        item.height = 12;
                    }else if(item.material === 6 || item.material === 25 || item.material === 24){
                        this.blocks.splice(this.blocks.indexOf(item), 1);
                    } else{
                        item.material = 6;

                        item.width = 16;
                        item.height = 24;
                    }
                } else{
                    if(this.countStar === 3){
                        this.blocks.splice(this.blocks.indexOf(item), 1);
                    }
                }

                //задержка, чтобы пули не вылетали сразу же после сталкивания
                setTimeout(() => {
                    this.timer = true;
                }, 500);
            }
        })

         //столкновение с орлом
         if(this.bulletY + BULLET_SIZE >= 24 * BLOCK_HEIGHT && this.bulletY <= 24 * BLOCK_HEIGHT + EAGLE_SIZE && this.bulletX + BULLET_SIZE >= 12 * BLOCK_WIDTH && this.bulletX <= 12 * BLOCK_WIDTH + EAGLE_SIZE){
            this.explosion(19, this.soundExplosion2);

            cancelAnimationFrame(id);
            this.eagleState = 21;
            this.gameOver();
        }
      
        //столкновение с границами карты
        if(this.bulletX <= 0){
            this.explosion(17, this.soundBulletHit1);

            cancelAnimationFrame(id);

            //задержка, чтобы пули не вылетали сразу же после сталкивания
            setTimeout(() => {
                this.timer = true;
            }, 500);

        }
    }

    //столкновение пули, когда она летит вправо
    this.checkCollisionBulletRight = function(id){
        this.blocks.find(item => {
            if(this.bulletY + BULLET_SIZE >= item.y && this.bulletY <= item.y + item.height && this.bulletX + BULLET_SIZE >= item.x && this.bulletX <= item.x + item.width){

                cancelAnimationFrame(id);

                this.explosion(17, this.soundBulletHit2);

                if(item.material !== 2){
                    if(item.material === 4){
                        item.material = 25;

                        item.x = item.x + item.width / 2;

                        item.width = 16;
                        item.height = 12;
                    }else if(item.material === 5){
                        item.material = 24;
                        
                        item.x = item.x + item.width / 2;

                        item.width = 16;
                        item.height = 12;
                    }else if(item.material === 3 || item.material === 25 || item.material === 24){
                        this.blocks.splice(this.blocks.indexOf(item), 1);
                    } else{
                        item.material = 3;

                        item.x = item.x + item.width / 2;

                        item.width = 16;
                        item.height = 24;
                    }
                } else{
                    if(this.countStar === 3){
                        this.blocks.splice(this.blocks.indexOf(item), 1);
                    }
                }
                
                //задержка, чтобы пули не вылетали сразу же после сталкивания
                setTimeout(() => {
                    this.timer = true;
                }, 500);
            }
        })
        

        //столкновение с орлом
        if(this.bulletY + BULLET_SIZE >= 24 * BLOCK_HEIGHT && this.bulletY <= 24 * BLOCK_HEIGHT + EAGLE_SIZE && this.bulletX + BULLET_SIZE >= 12 * BLOCK_WIDTH && this.bulletX <= 12 * BLOCK_WIDTH + EAGLE_SIZE){
            this.explosion(19, this.soundExplosion2);

            cancelAnimationFrame(id);
            this.eagleState = 21;
            this.gameOver();
        }
        
        //столкновение с границами карты
        if(this.bulletX > CANVAS_WIDTH - BULLET_SIZE){
            this.explosion(17, this.soundBulletHit1);

            cancelAnimationFrame(id);

            //задержка, чтобы пули не вылетали сразу же после сталкивания
            setTimeout(() => {
                this.timer = true;
            }, 500);
        }
    }

    //столкновение пули, когда она летит вниз
    this.checkCollisionBulletDown = function(id){
        this.blocks.find(item => {
            if(this.bulletX + BULLET_SIZE >= item.x && this.bulletX <= item.x + item.width && this.bulletY + BULLET_SIZE <= item.y + item.height && this.bulletY + BULLET_SIZE >= item.y){

                cancelAnimationFrame(id);

                this.explosion(17, this.soundBulletHit2);

                if(item.material !== 2){
                    if(item.material === 6){
                        item.material = 25;

                        item.y = item.y + item.height / 2;

                        item.width = 16;
                        item.height = 12;
                    }else if(item.material === 3){
                        item.material = 24;

                        item.y = item.y + item.height / 2;

                        item.width = 16;
                        item.height = 12;
                    }else if(item.material === 5 || item.material === 24 || item.material === 25){
                        this.blocks.splice(this.blocks.indexOf(item), 1);
                    } else{
                        item.material = 5;

                        item.y = item.y + item.height / 2;

                        item.width = 32;
                        item.height = 12;
                    }
                } else{
                    if(this.countStar === 3){
                        this.blocks.splice(this.blocks.indexOf(item), 1);
                    }
                }

                //задержка, чтобы пули не вылетали сразу же после сталкивания
                setTimeout(() => {
                    this.timer = true;
                }, 500);
            }
        })

        //столкновение с орлом
        if(this.bulletX + BULLET_SIZE >= 12 * BLOCK_WIDTH && this.bulletX <= 12 * BLOCK_WIDTH + EAGLE_SIZE && this.bulletY + BULLET_SIZE <= 24 * BLOCK_HEIGHT + EAGLE_SIZE && this.bulletY + BULLET_SIZE >= 24 * BLOCK_HEIGHT){
            this.explosion(19, this.soundExplosion2);

            cancelAnimationFrame(id);
            this.eagleState = 21;
            this.gameOver();
        }

        //столкновение с границами карты
        if(this.bulletY > CANVAS_HEIGHT - BULLET_SIZE){
            this.explosion(17, this.soundBulletHit1);

            cancelAnimationFrame(id);

            //задержка, чтобы пули не вылетали сразу же после сталкивания
            setTimeout(() => {
                this.timer = true;
            }, 500);
        }
    }

    //столкновение пули, когда она летит вверх
    this.checkCollisionBulletUp = function(id){
        this.blocks.find(item => {
            if(this.bulletX + BULLET_SIZE >= item.x && this.bulletX <= item.x + item.width && this.bulletY <= item.y + item.height && this.bulletY >= item.y){

                cancelAnimationFrame(id);

                this.explosion(17, this.soundBulletHit2);

                if(item.material !== 2){
                    if(item.material === 6){
                        item.material = 24;
                        item.width = 16;
                        item.height = 12;
                    }else if(item.material === 3){
                        item.material = 25;
                        item.width = 16;
                        item.height = 12;
                    }else if(item.material === 4 || item.material === 24 || item.material === 25){
                        this.blocks.splice(this.blocks.indexOf(item), 1);
                    } else{
                        item.material = 4;
                        item.width = 32;
                        item.height = 12;
                    }
                } else{
                    if(this.countStar === 3){
                        this.blocks.splice(this.blocks.indexOf(item), 1);
                    }
                }

                //задержка, чтобы пули не вылетали сразу же после сталкивания
                setTimeout(() => {
                    this.timer = true;
                }, 500);
            }
        })

        //столкновение с границами карты
        if(this.bulletY <= 0){
            this.explosion(17, this.soundBulletHit1);

            cancelAnimationFrame(id);

            //задержка, чтобы пули не вылетали сразу же после сталкивания
            setTimeout(() => {
                this.timer = true;
            }, 500);
        }
    }

    this.bulletMovement = () => {
        this.timer = false;
        const animId = requestAnimationFrame(this.bulletMovement);

        switch (this.bulletDirection) {
            case 11:
                this.checkCollisionBulletUp(animId);
                break;
            case 13:
                this.checkCollisionBulletDown(animId);
                break;
            case 14:
                this.checkCollisionBulletLeft(animId);
                break;
            case 12:
                this.checkCollisionBulletRight(animId);
                break;
        
            default:
                break;
        }
        
        this.bulletY += this.speedBylletY;
        this.bulletX += this.speedBylletX;

        myView.drawPlayerOneBullet(this.bulletDirection, this.bulletX, this.bulletY);
    }

    this.playerOneShiftKeydown = () => {
        if(this.isShoots){
            if(!this.bullet && this.timer){
                this.soundShoot.play();
                this.bullet = true;
                switch (this.key) {
                    case 'ArrowUp':
                        this.bulletX = this.playerX + TANK_SIZE / 2 - BULLET_SIZE / 2;
                        this.bulletY = this.playerY;
                    
                        this.speedBylletY = -6;
                        this.speedBylletX = 0;

                        this.bulletDirection = 11;
                    break;
                    case 'ArrowDown':
                        this.bulletX = this.playerX + TANK_SIZE / 2 - BULLET_SIZE / 2;
                        this.bulletY = this.playerY + TANK_SIZE - BULLET_SIZE;

                        this.speedBylletY = 6;
                        this.speedBylletX = 0;

                        this.bulletDirection = 13;
                    break;
                    case 'ArrowLeft':
                        this.bulletX = this.playerX;
                        this.bulletY = this.playerY + TANK_SIZE / 2 - BULLET_SIZE / 2;

                        this.speedBylletX = -6;
                        this.speedBylletY = 0;

                        this.bulletDirection = 14;
                        break;
                    case 'ArrowRight':
                        this.bulletX = this.playerX + TANK_SIZE - BULLET_SIZE;
                        this.bulletY = this.playerY + TANK_SIZE / 2 - BULLET_SIZE / 2;

                        this.speedBylletX = 6;
                        this.speedBylletY = 0;

                        this.bulletDirection = 12;
                        break;
                
                    default:
                        break;
                }
                requestAnimationFrame(this.bulletMovement);
            }
        }
    }
    
    this.gameOver = function(){
        this.soundMotor.pause();
        this.soundMovement.pause();
        this.game = true;
        
        this.soundGameOver.play();

        setTimeout(() => {
            myView.gameOver();
        }, 1000);
    }

    this.start = function(){
        requestAnimationFrame(this.loop);
    }

    this.loop = () => {
        myView.clearField();
        this.playerOneKeydown();
        this.drawEnemyTanks();
        this.field();

        requestAnimationFrame(this.loop);
    }
}
