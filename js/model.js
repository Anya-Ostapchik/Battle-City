import { levels } from "./levels.js";
import { spriteMap } from "./sprite-map.js";
import { settings, BLOCK_WIDTH, BLOCK_HEIGHT, CANVAS_HEIGHT, CANVAS_WIDTH, BULLET_SIZE, EXPLOSION_SIZE } from "./settings.js";


export function Model(){
    let myView = null;
    let soundStageStart = null;
    let blockCoordinates = [];
    let soundShoot = null;
    let soundBulletHit1 = null;
    this.bulletY = 0;
    this.bulletX = 0;
    this.timer = true;
    
    this.init = function(view){
        myView = view;

        this.blocks = [];
        this.bullet = false;
        this.bulletDirection = null;
        
        // this.speedBylletX= 0;
        this.speedBylletY = 0;
        this.speedBylletX = 0;
        // this.bullIscreate=false;
        this.collision = false;
        // this.bulletPosX = 0;
        // this.bulletPosY = 0;
        // this.bulletSpeed = -3;

        soundStageStart = new Audio('sound/sound_stage_start.ogg');
        soundShoot = new Audio('sound/sound_bullet_shot.ogg');
        soundBulletHit1 = new Audio('sound/sound_bullet_hit_1.ogg');

        this.getElemsMap();
        // console.log(this.blocks);
    }

    this.field = function(){
        for(let i = 0; i < this.blocks.length; i++){
            myView.drawField(spriteMap[this.blocks[i].material], this.blocks[i].x, this.blocks[i].y, this.blocks[i].width, this.blocks[i].height);
        }
        myView.drawEagle();
    }

    this.getElemsMap = function(){
        for (let i = 0; i < levels[settings.level - 1].length; i++) {
            for (let j = 0; j < levels[settings.level - 1][i].length; j++) {
                if(levels[settings.level - 1][i][j]){
                    this.blocks.push({x: j * BLOCK_WIDTH, y: i * BLOCK_HEIGHT, material: levels[settings.level - 1][i][j], width: BLOCK_WIDTH, height: BLOCK_HEIGHT});
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

    //     window.scrollTo(0, settings.windowHeight * 3);

    //     let i = 0;

    //     const id = setInterval(() => {
    //         i++;
    //         if(i === 2){
    //             soundStageStart.play();
    //         }
    //         if(i === 5){
                window.scrollTo(0, settings.windowHeight * 4);
                // requestAnimationFrame(this.drawEnemyTanks);
        //         clearInterval(id);
        //     }
        // }, 1000);

    }

    this.drawEnemyTanks = function(){
        if(settings.playerTwo){
            settings.countEnemy = 6;
        }
        
    }

    this.gameStartTwoPlayer = function(){

    }
    this.checkCollisionTank = function(){
        switch (settings.key) {
            case 'ArrowUp':
                this.blocks.find(item => {
                    if(settings.playerOnePosX + settings.tankSize > item.x + settings.measurementError && settings.playerOnePosX < item.x + BLOCK_WIDTH - settings.measurementError && settings.playerOnePosY === item.y + BLOCK_HEIGHT - settings.measurementError){
                        settings.playerOneSpeedY = 0;
                    }
                })
        
                //столкновение с орлом
                // if(settings.playerOnePosX + settings.tankSize > 13 * BLOCK_WIDTH + settings.measurementError && settings.playerOnePosX < 13 * BLOCK_WIDTH + BLOCK_WIDTH - settings.measurementError && settings.playerOnePosY === 24 * BLOCK_HEIGHT + BLOCK_HEIGHT - settings.measurementError){
                //     settings.playerOneSpeedY = 0;
                // }
        
                //столкновение с границами карты
                if(settings.playerOnePosY < 0){
                    settings.playerOneSpeedY = 0;
                }
                break;
        
            case 'ArrowDown':
                this.blocks.find(item => {
                    if(settings.playerOnePosX + settings.tankSize > item.x + settings.measurementError && settings.playerOnePosX < item.x + BLOCK_WIDTH - settings.measurementError && settings.playerOnePosY + settings.tankSize === item.y + settings.measurementError){
                        settings.playerOneSpeedY = 0;
                    }
                })

                //столкновение с орлом
                // if(settings.playerOnePosX + settings.tankSize > 13 * BLOCK_WIDTH + settings.measurementError && settings.playerOnePosX < 13 * BLOCK_WIDTH + BLOCK_WIDTH - settings.measurementError && settings.playerOnePosY + settings.tankSize === 24 * BLOCK_HEIGHT + settings.measurementError){
                //     settings.playerOneSpeedY = 0;
                // }

                //столкновение с границами карты
                if(settings.playerOnePosY > CANVAS_HEIGHT - settings.tankSize){
                    settings.playerOneSpeedY = 0;
                }
                break;
        
            case 'ArrowLeft':
                this.blocks.find(item => {
                    if(settings.playerOnePosX === item.x + BLOCK_WIDTH - settings.measurementError && settings.playerOnePosY + settings.tankSize > item.y + settings.measurementError && settings.playerOnePosY < item.y + BLOCK_HEIGHT - settings.measurementError){
                        settings.playerOneSpeedX = 0;
                    }
                })

                //столкновение с орлом
                // if(settings.playerOnePosX === 13 * BLOCK_HEIGHT + BLOCK_HEIGHT - settings.measurementError && settings.playerOnePosY + settings.tankSize > 24 * BLOCK_HEIGHT + settings.measurementError && settings.playerOnePosY < 24 * BLOCK_HEIGHT + BLOCK_HEIGHT - settings.measurementError){
                //     settings.playerOneSpeedX = 0;
                // }

                //столкновение с границами карты
                if(settings.playerOnePosX < 0){
                    settings.playerOneSpeedX = 0;
                }
                break;
        
            case 'ArrowRight':
                this.blocks.find(item => {
                    if(settings.playerOnePosX + settings.tankSize === item.x + settings.measurementError && settings.playerOnePosY + settings.tankSize > item.y + settings.measurementError && settings.playerOnePosY < item.y + BLOCK_HEIGHT - settings.measurementError){
                        settings.playerOneSpeedX = 0;
                    }
                })
                
                //столкновение с орлом
                // if(settings.playerOnePosX + settings.tankSize === 13 * BLOCK_WIDTH + settings.measurementError && settings.playerOnePosY + settings.tankSize > 24 * BLOCK_HEIGHT + settings.measurementError && settings.playerOnePosY < 24 * BLOCK_HEIGHT + BLOCK_HEIGHT - settings.measurementError){
                //     settings.playerOneSpeedX = 0;
                // }
                
                //столкновение с границами карты
                if(settings.playerOnePosX > CANVAS_WIDTH - settings.tankSize){
                    settings.playerOneSpeedX = 0;
                }
                break;
        
            default:
                break;
        }
    }

    this.playerOneKeydown = function(){
        if(settings.isMoving){
            switch (settings.key) {
                case 'ArrowUp':
                    settings.playerOneSpeedY = -2;
                    settings.playerOneSpeedX = 0;

                    this.checkCollisionTank();
                    
                    settings.playerOnePosY += settings.playerOneSpeedY;

                    myView.drawPlayerOne(7);
                    break;
                case 'ArrowDown':
                    settings.playerOneSpeedY = 2;
                    settings.playerOneSpeedX = 0;

                    this.checkCollisionTank();

                    settings.playerOnePosY += settings.playerOneSpeedY;

                    myView.drawPlayerOne(9);
                    break;
                case 'ArrowLeft':
                    settings.playerOneSpeedX = -2;
                    settings.playerOneSpeedY = 0;

                    this.checkCollisionTank();

                    settings.playerOnePosX += settings.playerOneSpeedX;

                    myView.drawPlayerOne(10);
                    break;
                case 'ArrowRight':
                    settings.playerOneSpeedX = 2;
                    settings.playerOneSpeedY = 0;

                    this.checkCollisionTank();

                    settings.playerOnePosX += settings.playerOneSpeedX;

                    myView.drawPlayerOne(8);
                    break;
                default:
                    break;
            }
        } 
        else{
            switch (settings.key) {
                case 'ArrowUp':
                    settings.playerOneSpeedY = 0;
                    myView.drawPlayerOne(7);
                    break;
                case 'ArrowDown':
                    settings.playerOneSpeedY = 0;
                    myView.drawPlayerOne(9);
                    break;
                case 'ArrowLeft':
                    settings.playerOneSpeedX = 0;
                    myView.drawPlayerOne(10);
                    break;
                case 'ArrowRight':
                    settings.playerOneSpeedX = 0;
                    myView.drawPlayerOne(8);
                    break;
                default:
                    break;
            } 
        }
    }

    //столкновение пули слева
    this.checkCollisionBulletLeft = function(id){
        this.blocks.find(item => {
            if(this.bulletX <= item.x + item.width && this.bulletX >= item.x && this.bulletY + BULLET_SIZE >= item.y && this.bulletY <= item.y + item.height){
                this.bullet = false;
                cancelAnimationFrame(id);

                if(item.material === 6){
                    this.blocks.splice(this.blocks.indexOf(item), 1);
                } else{
                    item.material = 6;
                }
                item.width = 12;
                item.height = 24;

                //задержка, чтобы пули не вылетали сразу же после сталкивания
                setTimeout(() => {
                    this.timer = true;
                }, 500);
            }
        })

        //столкновение с орлом
        // if(this.bulletX === 13 * BLOCK_HEIGHT + BLOCK_HEIGHT && this.bulletY + BULLET_SIZE > 24 * BLOCK_HEIGHT && this.bulletY < 24 * BLOCK_HEIGHT + BLOCK_HEIGHT){
        //     this.bullet = false;
        //     cancelAnimationFrame(id);
        // }

        //столкновение с границами карты
        if(this.bulletX <= 0){
            // const anim = requestAnimationFrame(this.drawExplosion);

            soundBulletHit1.play();
            this.bullet = false;

            cancelAnimationFrame(id);

            //задержка, чтобы пули не вылетали сразу же после сталкивания
            setTimeout(() => {
                // cancelAnimationFrame(anim);
                this.timer = true;
            }, 500);

        }
    }

    this.drawExplosion = () => {
        myView.drawExplosion(15, this.bulletX, this.bulletY - EXPLOSION_SIZE / 2);
        myView.drawExplosion(16, this.bulletX, this.bulletY - EXPLOSION_SIZE / 2);
        myView.drawExplosion(17, this.bulletX, this.bulletY - EXPLOSION_SIZE / 2);
        requestAnimationFrame(this.drawExplosion);
    }

    //столкновение пули справа
    this.checkCollisionBulletRight = function(id){
        this.blocks.find(item => {
            if(this.bulletX + BULLET_SIZE >= item.x && this.bulletX + BULLET_SIZE <= item.x + item.width && this.bulletY + BULLET_SIZE >= item.y && this.bulletY <= item.y + item.height){
                this.bullet = false;
                cancelAnimationFrame(id);

                if(item.material === 3){
                    this.blocks.splice(this.blocks.indexOf(item), 1);
                } else{
                    item.material = 3;
                }
                item.width = 12;
                item.height = 24;

                //задержка, чтобы пули не вылетали сразу же после сталкивания
                setTimeout(() => {
                    this.timer = true;
                }, 500);
            }
        })
        
        //столкновение с орлом
        // if(this.bulletX + BULLET_SIZE === 13 * BLOCK_WIDTH && this.bulletY + BULLET_SIZE > 24 * BLOCK_HEIGHT && this.bulletY < 24 * BLOCK_HEIGHT + BLOCK_HEIGHT){
        //     this.bullet = false;
        //     cancelAnimationFrame(id);
        // }
        
        //столкновение с границами карты
        if(this.bulletX > CANVAS_WIDTH - BULLET_SIZE){
            soundBulletHit1.play();
            this.bullet = false;
            cancelAnimationFrame(id);

            //задержка, чтобы пули не вылетали сразу же после сталкивания
            setTimeout(() => {
                this.timer = true;
            }, 500);
        }
    }

    //столкновение пули снизу
    this.checkCollisionBulletDown = function(id){
        this.blocks.find(item => {
            if(this.bulletX + BULLET_SIZE >= item.x && this.bulletX <= item.x + item.width && this.bulletY + BULLET_SIZE <= item.y + item.height && this.bulletY + BULLET_SIZE >= item.y){
                this.bullet = false;
                cancelAnimationFrame(id);

                if(item.material === 5){
                    this.blocks.splice(this.blocks.indexOf(item), 1);
                } else{
                    item.material = 5;
                }
                item.width = 32;
                item.height = 12;

                //задержка, чтобы пули не вылетали сразу же после сталкивания
                setTimeout(() => {
                    this.timer = true;
                }, 500);
            }
        })

        //столкновение с орлом
        // if(this.bulletX + BULLET_SIZE > 13 * BLOCK_WIDTH && this.bulletX < 13 * BLOCK_WIDTH + BLOCK_WIDTH && this.bulletY + BULLET_SIZE === 24 * BLOCK_HEIGHT){
        //     this.bullet = false;
        //     cancelAnimationFrame(id);
        // }

        //столкновение с границами карты
        if(this.bulletY > CANVAS_HEIGHT - BULLET_SIZE){
            soundBulletHit1.play();
            this.bullet = false;
            cancelAnimationFrame(id);

            //задержка, чтобы пули не вылетали сразу же после сталкивания
            setTimeout(() => {
                this.timer = true;
            }, 500);
        }
    }

    //столкновение пули сверху
    this.checkCollisionBulletUp = function(id){
        this.blocks.find(item => {
            if(this.bulletX + BULLET_SIZE >= item.x && this.bulletX <= item.x + item.width && this.bulletY <= item.y + item.height && this.bulletY >= item.y){
                this.bullet = false;
                cancelAnimationFrame(id);

                if(item.material === 4){
                    this.blocks.splice(this.blocks.indexOf(item), 1);
                } else{
                    item.material = 4;
                }
                item.width = 32;
                item.height = 12;
                
                //задержка, чтобы пули не вылетали сразу же после сталкивания
                setTimeout(() => {
                    this.timer = true;
                }, 500);
            }
        })

        //столкновение с орлом
        // if(this.bulletX + BULLET_SIZE > 13 * BLOCK_WIDTH && this.bulletX < 13 * BLOCK_WIDTH + BLOCK_WIDTH && this.bulletY == 24 * BLOCK_HEIGHT + BLOCK_HEIGHT){
        //     this.bullet = false;
        //     cancelAnimationFrame(id);                
        // }

        //столкновение с границами карты
        if(this.bulletY < 0){
            soundBulletHit1.play();
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
        
        this.bulletY += settings.playerOneSpeedBulletY;
        this.bulletX += settings.playerOneSpeedBulletX;

        myView.drawPlayerOneBullet(this.bulletDirection, this.bulletX, this.bulletY);
    }

    this.playerOneShiftKeydown = () => {
        if(settings.isShoots){
            if(!this.bullet && this.timer){
                soundShoot.play();
                this.bullet = true;
                switch (settings.key) {
                    case 'ArrowUp':
                        this.bulletX = settings.playerOnePosX + settings.tankSize / 2 - BULLET_SIZE / 2;
                        this.bulletY = settings.playerOnePosY;
                    
                        settings.playerOneSpeedBulletY = -6;
                        settings.playerOneSpeedBulletX = 0;

                        this.bulletDirection = 11;
                    break;
                    case 'ArrowDown':
                        this.bulletX = settings.playerOnePosX + settings.tankSize / 2 - BULLET_SIZE / 2;
                        this.bulletY = settings.playerOnePosY + settings.tankSize - BULLET_SIZE;

                        settings.playerOneSpeedBulletY = 6;
                        settings.playerOneSpeedBulletX = 0;

                        this.bulletDirection = 13;
                    break;
                    case 'ArrowLeft':
                        this.bulletX = settings.playerOnePosX;
                        this.bulletY = settings.playerOnePosY + settings.tankSize / 2 - BULLET_SIZE / 2;

                        settings.playerOneSpeedBulletX = -6;
                        settings.playerOneSpeedBulletY = 0;

                        this.bulletDirection = 14;
                        break;
                    case 'ArrowRight':
                        this.bulletX = settings.playerOnePosX + settings.tankSize - BULLET_SIZE;
                        this.bulletY = settings.playerOnePosY + settings.tankSize / 2 - BULLET_SIZE / 2;

                        settings.playerOneSpeedBulletX = 6;
                        settings.playerOneSpeedBulletY = 0;

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
