import { levels } from "./levels.js";
import { spriteMap } from "./sprite-map.js";
import { settings, BLOCK_WIDTH, BLOCK_HEIGHT, CANVAS_HEIGHT, CANVAS_WIDTH, BULLET_SIZE, EXPLOSION_SIZE, EAGLE_SIZE, TANK_SIZE, MEASUREMENT_ERROR} from "./constants.js";


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
    
    this.init = function(view){
        myView = view;

        this.soundStageStart = new Audio('sound/sound_stage_start.ogg');
        this.soundShoot = new Audio('sound/sound_bullet_shot.ogg');
        this.soundBulletHit1 = new Audio('sound/sound_bullet_hit_1.ogg');
        this.soundBulletHit2 = new Audio('sound/sound_bullet_hit_2.ogg');
        this.soundExplosion1 = new Audio('sound/sound_explosion_1.ogg'); //взрыв танка
        this.soundExplosion2 = new Audio('sound/sound_explosion_2.ogg'); //взрыв орла

        this.getElemsMap();
    }

    this.field = function(){
        for(let i = 0; i < this.blocks.length; i++){
            myView.drawField(spriteMap[this.blocks[i].material], this.blocks[i].x, this.blocks[i].y, this.blocks[i].width, this.blocks[i].height);
        }
        myView.drawEagle(this.eagleState);
    }

    this.getElemsMap = function(){
        for (let i = 0; i < levels[this.level - 1].length; i++) {
            for (let j = 0; j < levels[this.level - 1][i].length; j++) {
                if(levels[this.level - 1][i][j]){
                    this.blocks.push({x: j * BLOCK_WIDTH, y: i * BLOCK_HEIGHT, material: levels[this.level - 1][i][j], width: BLOCK_WIDTH, height: BLOCK_HEIGHT});
                }
            }
        }
    }

    this.showStatistics = function(){
        window.scrollTo(0, settings.windowHeight * 2);
    }

    this.showRules = function(){
        window.scrollTo(0, settings.windowHeight * 1);
    }

    this.gameStartOnePlayer = function(){
        this.start();
        myView.drawRemainingTanks();

        // window.scrollTo(0, settings.windowHeight * 3);

        // let i = 0;

        // const id = setInterval(() => {
        //     i++;
        //     if(i === 2){
        //         this.soundStageStart.play();
        //     }
        //     if(i === 5){
                window.scrollTo(0, settings.windowHeight * 4);
                // requestAnimationFrame(this.drawEnemyTanks);
        //         clearInterval(id);
        //     }
        // }, 1000);

    }

    this.drawEnemyTanks = function(){

        
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
        if(this.isMoving){
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
        else{
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
        myView.drawExplosion(this.i, this.bulletX, this.bulletY - EXPLOSION_SIZE / 2);

        requestAnimationFrame(this.drawExplosion);
    }

    //столкновение пули, когда она летит влево
    this.checkCollisionBulletLeft = function(id){
        this.blocks.find(item => {
            if(this.bulletY + BULLET_SIZE >= item.y && this.bulletY <= item.y + item.height && this.bulletX + BULLET_SIZE >= item.x && this.bulletX <= item.x + item.width){
                
                // const interval = setInterval(() => {
                //     this.i++;
                //     const anim = requestAnimationFrame(this.drawExplosion);
                //     if(this.i > 17){
                //         cancelAnimationFrame(anim);
                //         console.log(anim);
                //         this.i = 15;
                //         clearInterval(interval);
                //     }
                // }, 180);

                this.soundBulletHit2.play();
                this.bullet = false;
                cancelAnimationFrame(id);

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
            // const interval = setInterval(() => {
            //     this.i++;
            //     const anim = requestAnimationFrame(this.drawExplosion);
            //     if(this.i > 19){
            //         cancelAnimationFrame(anim);
            //         console.log(anim);
            //         this.i = 15;
            //         clearInterval(interval);
            //     }
            // }, 180);
            this.soundExplosion2.play();
            this.bullet = false;
            cancelAnimationFrame(id);
            this.eagleState = 21;
        }
      
        //столкновение с границами карты
        if(this.bulletX <= 0){
            // const interval = setInterval(() => {
            //     this.i++;
            //     const anim = requestAnimationFrame(this.drawExplosion);
            //     if(this.i > 17){
            //         cancelAnimationFrame(anim);
            //         console.log(anim);
            //         this.i = 15;
            //         clearInterval(interval);
            //     }
            // }, 180);

            this.soundBulletHit1.play();
            this.bullet = false;

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
                // const interval = setInterval(() => {
                //     this.i++;
                //     const anim = requestAnimationFrame(this.drawExplosion);
                //     if(this.i > 17){
                //         cancelAnimationFrame(anim);
                //         console.log(anim);
                //         this.i = 15;
                //         clearInterval(interval);
                //     }
                // }, 180);
                this.soundBulletHit2.play();
                this.bullet = false;
                cancelAnimationFrame(id);

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
            // const interval = setInterval(() => {
            //     this.i++;
            //     const anim = requestAnimationFrame(this.drawExplosion);
            //     if(this.i > 19){
            //         cancelAnimationFrame(anim);
            //         console.log(anim);
            //         this.i = 15;
            //         clearInterval(interval);
            //     }
            // }, 180);
            this.soundExplosion2.play();
            this.bullet = false;
            cancelAnimationFrame(id);
            this.eagleState = 21;
            
            //звук взрыв штаба
        }
        
        //столкновение с границами карты
        if(this.bulletX > CANVAS_WIDTH - BULLET_SIZE){
            // const interval = setInterval(() => {
            //     this.i++;
            //     const anim = requestAnimationFrame(this.drawExplosion);
            //     if(this.i > 17){
            //         cancelAnimationFrame(anim);
            //         console.log(anim);
            //         this.i = 15;
            //         clearInterval(interval);
            //     }
            // }, 180);
            this.soundBulletHit1.play();
            this.bullet = false;
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
                // const interval = setInterval(() => {
                //     this.i++;
                //     const anim = requestAnimationFrame(this.drawExplosion);
                //     if(this.i > 17){
                //         cancelAnimationFrame(anim);
                //         console.log(anim);
                //         this.i = 15;
                //         clearInterval(interval);
                //     }
                // }, 180);
                this.soundBulletHit2.play();
                this.bullet = false;
                cancelAnimationFrame(id);

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
            // const interval = setInterval(() => {
            //     this.i++;
            //     const anim = requestAnimationFrame(this.drawExplosion);
            //     if(this.i > 19){
            //         cancelAnimationFrame(anim);
            //         console.log(anim);
            //         this.i = 15;
            //         clearInterval(interval);
            //     }
            // }, 180);
            this.soundExplosion2.play();
            this.bullet = false;
            cancelAnimationFrame(id);
            this.eagleState = 21;
        }

        //столкновение с границами карты
        if(this.bulletY > CANVAS_HEIGHT - BULLET_SIZE){
            // const interval = setInterval(() => {
            //     this.i++;
            //     const anim = requestAnimationFrame(this.drawExplosion);
            //     if(this.i > 17){
            //         cancelAnimationFrame(anim);
            //         console.log(anim);
            //         this.i = 15;
            //         clearInterval(interval);
            //     }
            // }, 180);
            this.soundBulletHit1.play();
            this.bullet = false;
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
                // const interval = setInterval(() => {
                //     this.i++;
                //     const anim = requestAnimationFrame(this.drawExplosion);
                //     if(this.i > 17){
                //         cancelAnimationFrame(anim);
                //         console.log(anim);
                //         this.i = 15;
                //         clearInterval(interval);
                //     }
                // }, 180);
                this.soundBulletHit2.play();
                this.bullet = false;
                cancelAnimationFrame(id);

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
        if(this.bulletY < 0){
            // const interval = setInterval(() => {
            //     this.i++;
            //     const anim = requestAnimationFrame(this.drawExplosion);
            //     if(this.i > 17){
            //         cancelAnimationFrame(anim);
            //         console.log(anim);
            //         this.i = 15;
            //         clearInterval(interval);
            //     }
            // }, 180);
            this.soundBulletHit1.play();
            this.bullet = false;
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

    this.start = function(){
        requestAnimationFrame(this.loop);
    }

    this.loop = () => {
        myView.clearField();
        this.playerOneKeydown();
        this.field();

        requestAnimationFrame(this.loop);
    }
}
