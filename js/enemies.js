import { TANK_SIZE, CANVAS_WIDTH, CANVAS_HEIGHT, MEASUREMENT_ERROR, EAGLE_SIZE, BLOCK_WIDTH, BLOCK_HEIGHT, BULLET_SIZE, EXPLOSION_SIZE } from "./constants.js";
import { levels } from "./levels.js";
import { Model } from "./model.js";

export function Enemies(){
    this.bulletY = 0;
    this.bulletX = 0
    this.speedX = 0;
    this.speedY = 0;
    this.direction = null;
    this.allEnemyTanks = 0;
    let level = null;
    this.bullet = false;
    this.timer = true;
    this.i = 15;
    this.bulletDirection = null;
    this.model = new Model();
    this.playerPos = [];
    this.anim = null;

    this.init = (view, x, y, myLevel, arrBlocks, allTanks) => {
        this.viewGame = view;
        this.posX = x;
        this.posY = y;
        level = myLevel;
        this.blocks = arrBlocks;
        this.allTanks = allTanks;
        this.getRandomDirection();

        requestAnimationFrame(this.loop);
    }

    this.giveEnemiesPos = function(){
        return {x: this.posX, y: this.posY, d: this.direction, bx: this.bulletX, by: this.bulletY, redTank: this.tankRed};
    }

    this.delete = function(){
        cancelAnimationFrame(this.anim);
    }

    this.getPlayerPos = function(x, y){
        this.playerPos[0] = x;
        this.playerPos[1] = y;
    }

    this.getRandomDirection = function(){
        if(this.allTanks === 4 || this.allTanks === 11 || this.allTanks === 18){
            this.tankRed = true;
            if(levels[level - 1].enemies[this.allTanks - 1] === 0){
                this.direction = Math.floor(Math.random() * (33 - 30 + 1)) + 30;
            } else if(levels[level - 1].enemies[this.allTanks - 1] === 1){
                this.direction = Math.floor(Math.random() * (41 - 38 + 1)) + 38;
            }
        } else{
            this.tankRed = false;
            if(levels[level - 1].enemies[this.allTanks - 1] === 0){
                this.direction = Math.floor(Math.random() * (29 - 26 + 1)) + 26;
            } else if(levels[level - 1].enemies[this.allTanks - 1] === 1){
                this.direction = Math.floor(Math.random() * (37 - 34 + 1)) + 34;
            }
        }
    }

    this.setSpeed = function(){
        switch (this.direction) {
            case 26:
            case 30:
                this.speedY = -1;
                this.speedX = 0;
                break;
            case 34:
            case 38:
                this.speedY = -2;
                this.speedX = 0;
                break;
            case 27:
            case 31:
                this.speedY = 0;
                this.speedX = 1;
                break;
            case 35:
            case 39:
                this.speedY = 0;
                this.speedX = 2;
                break;
            case 28:
            case 32:
                this.speedY = 1;
                this.speedX = 0;
                break;
            case 36:
            case 40:
                this.speedY = 2;
                this.speedX = 0;
                break;
            case 29:
            case 33:
                this.speedY = 0;
                this.speedX = -1;
                break;
            case 37:
            case 41:
                this.speedY = 0;
                this.speedX = -2;
                break;
        
            default:
                break;
        }
    }

    this.drawAndCollision = function(){
        switch (this.direction) {
            case 26:
            case 30:
            case 34:
            case 38:
                //столкновение с игроком
                if(this.posX + TANK_SIZE >= this.playerPos[0] && this.posX <= this.playerPos[0] + TANK_SIZE && this.posY <= this.playerPos[1] + TANK_SIZE && this.posY >= this.playerPos[1]){
                    this.speedY =- this.speedY;
                    this.posY = this.playerPos[1] + TANK_SIZE;
                    this.direction = 28;
                }

                //столкновение с блоками
                this.blocks.find(item => {
                    if(item.material !== 42 && this.posX + TANK_SIZE >= item.x + MEASUREMENT_ERROR && this.posX <= item.x + BLOCK_WIDTH - MEASUREMENT_ERROR && this.posY <= item.y + BLOCK_HEIGHT - MEASUREMENT_ERROR && this.posY >= item.y + MEASUREMENT_ERROR){
                        this.speedY =- this.speedY;
                        this.posY = item.y + BLOCK_HEIGHT - MEASUREMENT_ERROR;
                        this.getRandomDirection();
                    }
                })
                
                //столкновение с границами карты
                if (this.posY <= 0) {
                    this.speedY =- this.speedY;
                    this.posY = 0;
                    this.getRandomDirection();
                }
                break;
        
            case 28:
            case 32:
            case 36:
            case 40:
                //столкновение с игроком
                if(this.posX + TANK_SIZE >= this.playerPos[0] && this.posX <= this.playerPos[0] + TANK_SIZE && this.posY + TANK_SIZE >= this.playerPos[1] && this.posY + TANK_SIZE <= this.playerPos[1] + TANK_SIZE){
                    this.speedY =- this.speedY;
                    this.posY = this.playerPos[1] - TANK_SIZE;
                    this.direction = 26;
                }

                //столкновение с блоками
                this.blocks.find(item => {
                    if(item.material !== 42 && this.posX + TANK_SIZE >= item.x + MEASUREMENT_ERROR && this.posX <= item.x + BLOCK_WIDTH - MEASUREMENT_ERROR && this.posY + TANK_SIZE >= item.y + MEASUREMENT_ERROR && this.posY + TANK_SIZE <= item.y + BLOCK_HEIGHT - MEASUREMENT_ERROR){
                        this.speedY =- this.speedY;
                        this.posY = item.y - TANK_SIZE + MEASUREMENT_ERROR;
                        this.getRandomDirection();
                    }
                })

                //столкновение с орлом
                if(this.posX + TANK_SIZE >= 12 * BLOCK_WIDTH + MEASUREMENT_ERROR && this.posX <= 12 * BLOCK_WIDTH + EAGLE_SIZE - MEASUREMENT_ERROR && this.posY + TANK_SIZE >= 24 * BLOCK_HEIGHT + MEASUREMENT_ERROR && this.posY + TANK_SIZE <= 24 * BLOCK_HEIGHT + BLOCK_HEIGHT - MEASUREMENT_ERROR){
                    this.speedY =- this.speedY;
                    this.posY = 24 * BLOCK_HEIGHT - TANK_SIZE + MEASUREMENT_ERROR;
                    this.getRandomDirection();
                }

                //столкновение с границами карты
                if (this.posY + TANK_SIZE >= CANVAS_HEIGHT ) {
                    this.speedY =- this.speedY;
                    this.posY = CANVAS_HEIGHT - TANK_SIZE;
                    this.getRandomDirection();
                }
                break;
        
            case 29:
            case 33:
            case 37:
            case 41:
                //столкновение с игроком
                if(this.posX <= this.playerPos[0] + TANK_SIZE && this.posX >= this.playerPos[0] && this.posY + TANK_SIZE >= this.playerPos[1] && this.posY <= this.playerPos[1] + TANK_SIZE){
                    this.speedY =- this.speedY;
                    this.posX = this.playerPos[0] + TANK_SIZE;
                    this.direction = 27;
                }

                //столкновение с блоками
                this.blocks.find(item => {
                    if(item.material !== 42 && this.posX <= item.x + BLOCK_WIDTH - MEASUREMENT_ERROR && this.posX >= item.x + MEASUREMENT_ERROR && this.posY + TANK_SIZE >= item.y + MEASUREMENT_ERROR && this.posY <= item.y + BLOCK_HEIGHT - MEASUREMENT_ERROR){
                        this.speedX =- this.speedX;
                        this.posX = item.x + BLOCK_WIDTH - MEASUREMENT_ERROR;
                        this.getRandomDirection();
                    }
                })

                //столкновение с орлом
                if(this.posX <= 12 * BLOCK_WIDTH + EAGLE_SIZE - MEASUREMENT_ERROR && this.posX >= 12 * BLOCK_WIDTH + MEASUREMENT_ERROR && this.posY + TANK_SIZE >= 24 * BLOCK_HEIGHT + MEASUREMENT_ERROR && this.posY <= 24 * BLOCK_HEIGHT + EAGLE_SIZE - MEASUREMENT_ERROR){
                    this.speedX =- this.speedX;
                    this.posX = 12 * BLOCK_WIDTH + EAGLE_SIZE - MEASUREMENT_ERROR;
                    this.getRandomDirection();
                }

                //столкновение с границами карты
                if(this.posX <= 0){
                    this.speedX =- this.speedX;
                    this.posX = 0;
                    this.getRandomDirection();
                }
                break;
        
            case 27:
            case 31:
            case 35:
            case 39:
                //столкновение с игроком
                if(this.posX + TANK_SIZE >= this.playerPos[0] && this.posX + TANK_SIZE <= this.playerPos[0] + TANK_SIZE && this.posY + TANK_SIZE >= this.playerPos[1] && this.posY <= this.playerPos[1] + TANK_SIZE){
                    this.speedY =- this.speedY;
                    this.posX = this.playerPos[0] - TANK_SIZE;
                    this.direction = 29;
                }

                //столкновение с блоками
                this.blocks.find(item => {
                    if(item.material !== 42 && this.posX + TANK_SIZE >= item.x + MEASUREMENT_ERROR && this.posX + TANK_SIZE <= item.x + BLOCK_WIDTH - MEASUREMENT_ERROR && this.posY + TANK_SIZE >= item.y + MEASUREMENT_ERROR && this.posY <= item.y + BLOCK_HEIGHT - MEASUREMENT_ERROR){
                        this.speedX =- this.speedX;
                        this.posX = item.x - TANK_SIZE + MEASUREMENT_ERROR;
                        this.getRandomDirection();
                    }
                })
                
                //столкновение с орлом
                if(this.posX + TANK_SIZE >= 12 * BLOCK_WIDTH + MEASUREMENT_ERROR && this.posX + TANK_SIZE <= 12 * BLOCK_WIDTH + EAGLE_SIZE - MEASUREMENT_ERROR && this.posY + TANK_SIZE >= 24 * BLOCK_HEIGHT + MEASUREMENT_ERROR && this.posY <= 24 * BLOCK_HEIGHT + EAGLE_SIZE - MEASUREMENT_ERROR){
                    this.speedX =- this.speedX;
                    this.posX = 12 * BLOCK_WIDTH - TANK_SIZE + MEASUREMENT_ERROR;
                    this.getRandomDirection();
                }
                
                //столкновение с границами карты
                if(this.posX + TANK_SIZE >= CANVAS_WIDTH){
                    this.speedX =- this.speedX;
                    this.posX = CANVAS_WIDTH - TANK_SIZE;
                    this.getRandomDirection();
                }
                break;
        
            default:
                break;
        }

        this.posX += this.speedX;
        this.posY += this.speedY;

        this.viewGame.drawEnemyTanks(this.direction, this.posX, this.posY);
    }

    this.drawExplosion = () => {
        let animId = null;

        switch (this.direction) {
            case 26:
            case 29:
                if(this.i < 18){
                    this.viewGame.drawExplosion(this.i, this.bulletX - BULLET_SIZE / 2, this.bulletY - BULLET_SIZE / 2, EXPLOSION_SIZE, EXPLOSION_SIZE);
                } else{
                    this.viewGame.drawExplosion(this.i, this.bulletX - BULLET_SIZE / 2, this.bulletY - BULLET_SIZE / 2, EXPLOSION_SIZE * 2, EXPLOSION_SIZE * 2);
                }
                break;
            case 28:
            case 27:
                if(this.i < 18){
                    this.viewGame.drawExplosion(this.i, this.bulletX - EXPLOSION_SIZE / 2, this.bulletY - EXPLOSION_SIZE / 2, EXPLOSION_SIZE, EXPLOSION_SIZE);
                } else{
                    this.viewGame.drawExplosion(this.i, this.bulletX - EXPLOSION_SIZE / 2, this.bulletY - EXPLOSION_SIZE / 2, EXPLOSION_SIZE * 2, EXPLOSION_SIZE * 2);
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

    this.explosion = function(i){
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
    }

    //столкновение пули, когда она летит влево
    this.checkCollisionBulletLeft = function(id){
        if(this.bulletY + BULLET_SIZE >= this.playerPos[1] && this.bulletY <= this.playerPos[1] + TANK_SIZE && this.bulletX + BULLET_SIZE >= this.playerPos[0] && this.bulletX <= this.playerPos[0] + TANK_SIZE){
            this.explosion(19);
            cancelAnimationFrame(id);

            //задержка, чтобы пули не вылетали сразу же после сталкивания
            setTimeout(() => {
                this.timer = true;
                this.bullet = false;
            }, 2000);
        }

        this.blocks.find(item => {
            if(item.material !== 42 && this.bulletY + BULLET_SIZE >= item.y && this.bulletY <= item.y + item.height && this.bulletX + BULLET_SIZE >= item.x && this.bulletX <= item.x + item.width){

                cancelAnimationFrame(id);

                this.explosion(17);

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
                }

                //задержка, чтобы пули не вылетали сразу же после сталкивания
                setTimeout(() => {
                    this.timer = true;
                    this.bullet = false;
                }, 2000);
            }
        })

         //столкновение с орлом
         if(this.bulletY + BULLET_SIZE >= 24 * BLOCK_HEIGHT && this.bulletY <= 24 * BLOCK_HEIGHT + EAGLE_SIZE && this.bulletX + BULLET_SIZE >= 12 * BLOCK_WIDTH && this.bulletX <= 12 * BLOCK_WIDTH + EAGLE_SIZE){
            this.explosion(19);

            cancelAnimationFrame(id);
            
            this.eagleState = 21;
        }
      
        //столкновение с границами карты
        if(this.bulletX <= 0){
            cancelAnimationFrame(id);

            //задержка, чтобы пули не вылетали сразу же после сталкивания
            setTimeout(() => {
                this.timer = true;
                this.bullet = false;
            }, 2000);
        }
    }

    //столкновение пули, когда она летит вправо
    this.checkCollisionBulletRight = function(id){
        if(this.bulletY + BULLET_SIZE >= this.playerPos[1] && this.bulletY <= this.playerPos[1] + TANK_SIZE && this.bulletX + BULLET_SIZE >= this.playerPos[0] && this.bulletX <= this.playerPos[0] + TANK_SIZE){
            this.explosion(19);

            cancelAnimationFrame(id);

            //задержка, чтобы пули не вылетали сразу же после сталкивания
            setTimeout(() => {
                this.timer = true;
                this.bullet = false;
            }, 2000);
        }

        this.blocks.find(item => {
            if(item.material !== 42 && this.bulletY + BULLET_SIZE >= item.y && this.bulletY <= item.y + item.height && this.bulletX + BULLET_SIZE >= item.x && this.bulletX <= item.x + item.width){

                cancelAnimationFrame(id);

                this.explosion(17);

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
                }
                
                //задержка, чтобы пули не вылетали сразу же после сталкивания
                setTimeout(() => {
                    this.timer = true;
                    this.bullet = false;
                }, 2000);
            }
        })

        //столкновение с орлом
        if(this.bulletY + BULLET_SIZE >= 24 * BLOCK_HEIGHT && this.bulletY <= 24 * BLOCK_HEIGHT + EAGLE_SIZE && this.bulletX + BULLET_SIZE >= 12 * BLOCK_WIDTH && this.bulletX <= 12 * BLOCK_WIDTH + EAGLE_SIZE){
            this.explosion(19);

            cancelAnimationFrame(id);
            this.eagleState = 21;
        }
        
        //столкновение с границами карты
        if(this.bulletX > CANVAS_WIDTH - BULLET_SIZE){
            cancelAnimationFrame(id);

            //задержка, чтобы пули не вылетали сразу же после сталкивания
            setTimeout(() => {
                this.timer = true;
                this.bullet = false;
            }, 2000);
        }
    }

    //столкновение пули, когда она летит вниз
    this.checkCollisionBulletDown = function(id){
        if(this.bulletX + BULLET_SIZE >= this.playerPos[0] && this.bulletX <= this.playerPos[0] + TANK_SIZE && this.bulletY + BULLET_SIZE >= this.playerPos[1] && this.bulletY + BULLET_SIZE <= this.playerPos[1] + TANK_SIZE){
            this.explosion(19);

            cancelAnimationFrame(id);

            //задержка, чтобы пули не вылетали сразу же после сталкивания
            setTimeout(() => {
                this.timer = true;
                this.bullet = false;
            }, 2000);
        }

        this.blocks.find(item => {
            console.log(item.material);
            if(item.material !== 42 && this.bulletX + BULLET_SIZE >= item.x && this.bulletX <= item.x + item.width && this.bulletY + BULLET_SIZE <= item.y + item.height && this.bulletY + BULLET_SIZE >= item.y){

                cancelAnimationFrame(id);

                this.explosion(17);

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
                }

                //задержка, чтобы пули не вылетали сразу же после сталкивания
                setTimeout(() => {
                    this.timer = true;
                    this.bullet = false;
                }, 2000);
            }
        })

        //столкновение с орлом
        if(this.bulletX + BULLET_SIZE >= 12 * BLOCK_WIDTH && this.bulletX <= 12 * BLOCK_WIDTH + EAGLE_SIZE && this.bulletY + BULLET_SIZE <= 24 * BLOCK_HEIGHT + EAGLE_SIZE && this.bulletY + BULLET_SIZE >= 24 * BLOCK_HEIGHT){
            this.explosion(19);

            cancelAnimationFrame(id);
            this.eagleState = 21;
        }

        //столкновение с границами карты
        if(this.bulletY > CANVAS_HEIGHT - BULLET_SIZE){
            cancelAnimationFrame(id);

            //задержка, чтобы пули не вылетали сразу же после сталкивания
            setTimeout(() => {
                this.timer = true;
                this.bullet = false;
            }, 2000);
        }
    }

    //столкновение пули, когда она летит вверх
    this.checkCollisionBulletUp = function(id){
        if(this.bulletX + BULLET_SIZE >= this.playerPos[0] && this.bulletX <= this.playerPos[0] + TANK_SIZE && this.bulletY >= this.playerPos[1] && this.bulletY <= this.playerPos[1] + TANK_SIZE){
            this.explosion(19);

            cancelAnimationFrame(id);

            //задержка, чтобы пули не вылетали сразу же после сталкивания
            setTimeout(() => {
                this.timer = true;
                this.bullet = false;
            }, 2000);
        }

        this.blocks.find(item => {
            if(item.material !== 42 && this.bulletX + BULLET_SIZE >= item.x && this.bulletX <= item.x + item.width && this.bulletY <= item.y + item.height && this.bulletY >= item.y){

                cancelAnimationFrame(id);

                this.explosion(17);

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
                }

                //задержка, чтобы пули не вылетали сразу же после сталкивания
                setTimeout(() => {
                    this.timer = true;
                    this.bullet = false;
                }, 2000);
            }
        })

        //столкновение с границами карты
        if(this.bulletY <= 0){
            cancelAnimationFrame(id);

            //задержка, чтобы пули не вылетали сразу же после сталкивания
            setTimeout(() => {
                this.timer = true;
                this.bullet = false;
            }, 2000);
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

        this.viewGame.drawBullet(this.bulletDirection, this.bulletX, this.bulletY);
    }

    this.setPosBullet = () => {
        if(!this.bullet && this.timer){
            this.bullet = true;
            switch (this.direction) {
                case 26:
                case 30:
                case 34:
                case 38:
                    this.bulletX = this.posX + TANK_SIZE / 2 - BULLET_SIZE / 2;
                    this.bulletY = this.posY;
                
                    this.speedBylletY = -3;
                    this.speedBylletX = 0;

                    this.bulletDirection = 11;
                break;
                case 28:
                case 32:
                case 36:
                case 40:
                    this.bulletX = this.posX + TANK_SIZE / 2 - BULLET_SIZE / 2;
                    this.bulletY = this.posY + TANK_SIZE - BULLET_SIZE;

                    this.speedBylletY = 3;
                    this.speedBylletX = 0;

                    this.bulletDirection = 13;
                break;
                case 29:
                case 33:
                case 37:
                case 41:
                    this.bulletX = this.posX;
                    this.bulletY = this.posY + TANK_SIZE / 2 - BULLET_SIZE / 2;

                    this.speedBylletX = -3;
                    this.speedBylletY = 0;

                    this.bulletDirection = 14;
                    break;
                case 27:
                case 31:
                case 35:
                case 39:
                    this.bulletX = this.posX + TANK_SIZE - BULLET_SIZE;
                    this.bulletY = this.posY + TANK_SIZE / 2 - BULLET_SIZE / 2;

                    this.speedBylletX = 3;
                    this.speedBylletY = 0;

                    this.bulletDirection = 12;
                    break;
            
                default:
                    break;
            }
            requestAnimationFrame(this.bulletMovement);
        }
    }

    this.loop = () => {
        this.setSpeed();
        this.drawAndCollision();
        this.setPosBullet();

        this.anim = requestAnimationFrame(this.loop);
    }
}