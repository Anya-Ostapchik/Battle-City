import { TANK_SIZE, CANVAS_WIDTH, CANVAS_HEIGHT, EAGLE_SIZE, BLOCK_WIDTH, BLOCK_HEIGHT, BULLET_SIZE } from "./constants.js";
import { Model } from "./model.js";
import { Player } from "./player.js";
import { Enemies } from "./enemies.js";

export function Bullet(){
    this.bulletY = 0; //позиция пули по Y
    this.bulletX = 0; //позиция пули по X
    this.bullet = false;
    this.timer = true;
    this.eagleState = 20;
    // this.model = new Model();

    this.init = (view, model, name, direction, posX, posY, speed, delay, blocks, pos) => {
        this.view = view;
        this.model = model;
        this.name = name;
        this.direction = direction;
        this.posX = posX;
        this.posY = posY;
        this.speed = speed;
        this.delay = delay;
        this.blocks = blocks;
        this.pos = pos;
        // this.player = player;
    }

    this.getParams = function(){
        
    }

    this.setPosBullet = () => {
        if(!this.bullet && this.timer){
            this.bullet = true;
            switch (this.direction) {
                case 26:
                case 30:
                case 34:
                case 38:
                case 'ArrowUp':
                    this.bulletX = this.posX + TANK_SIZE / 2 - BULLET_SIZE / 2;
                    this.bulletY = this.posY;

                    this.speedBulletY = -this.speed;
                    this.speedBulletX = 0;

                    this.bulletDirection = 11;
                break;
                case 28:
                case 32:
                case 36:
                case 40:
                case 'ArrowDown':
                    this.bulletX = this.posX + TANK_SIZE / 2 - BULLET_SIZE / 2;
                    this.bulletY = this.posY + TANK_SIZE - BULLET_SIZE;

                    this.speedBulletY = this.speed;
                    this.speedBulletX = 0;

                    this.bulletDirection = 13;
                break;
                case 29:
                case 33:
                case 37:
                case 41:
                case 'ArrowLeft':
                    this.bulletX = this.posX;
                    this.bulletY = this.posY + TANK_SIZE / 2 - BULLET_SIZE / 2;

                    this.speedBulletY = 0;
                    this.speedBulletX = -this.speed;

                    this.bulletDirection = 14;
                    break;
                case 27:
                case 31:
                case 35:
                case 39:
                case 'ArrowRight':
                    this.bulletX = this.posX + TANK_SIZE - BULLET_SIZE;
                    this.bulletY = this.posY + TANK_SIZE / 2 - BULLET_SIZE / 2;

                    this.speedBulletY = 0;
                    this.speedBulletX = this.speed;

                    this.bulletDirection = 12;
                    break;
            
                default:
                    break;
            }
            requestAnimationFrame(this.bulletMovement);
        }
    }

    //столкновение пули, когда она летит влево
    this.checkCollisionBulletLeft = function(id){
        this.blocks.find((item, index) => {
            if(!item){
                this.blocks.splice(index, 0);
            } else{
                if(item.material !== 42 && this.bulletY + BULLET_SIZE >= item.y && this.bulletY <= item.y + item.height && this.bulletX + BULLET_SIZE >= item.x && this.bulletX <= item.x + item.width){

                    cancelAnimationFrame(id);

                    // this.Model.explosion(17, this.soundBulletHit2);

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

                    setTimeout(() => {
                        this.timer = true;
                        this.bullet = false;
                    }, this.delay);
                }
            }
        })

        //столкновение с орлом
        if(this.bulletY + BULLET_SIZE >= 24 * BLOCK_HEIGHT && this.bulletY <= 24 * BLOCK_HEIGHT + EAGLE_SIZE && this.bulletX + BULLET_SIZE >= 12 * BLOCK_WIDTH && this.bulletX <= 12 * BLOCK_WIDTH + EAGLE_SIZE){
            // this.Model.explosion(19, this.soundExplosion2);

            cancelAnimationFrame(id);
            this.eagleState = 21;
            // this.Model.gameOver();
        }
      
        //столкновение с границами карты
        if(this.bulletX <= 0){
            // this.soundBulletHit1.play();
            // this.bullet = false;

            cancelAnimationFrame(id);

            //задержка, чтобы пули не вылетали сразу же после сталкивания
            setTimeout(() => {
                this.timer = true;
                this.bullet = false;
            }, this.delay);

        }

        if(this.name === 'player'){
            for(let i = 0; i < this.pos.length; i++){
                if(this.bulletX + BULLET_SIZE >= this.pos[i].x && this.bulletX <= this.pos[i].x + TANK_SIZE && this.bulletY >= this.pos[i].y && this.bulletY <= this.pos[i].y + TANK_SIZE){
                    if(this.pos[i].redTank){
                        // this.bonusCoordinate();
                        // requestAnimationFrame(this.showBonuses);
                    }

    
                    cancelAnimationFrame(id);

                    this.model.tankKilled(i);

    
                    setTimeout(() => {
                        this.timer = true;
                        this.bullet = false;
                    }, this.delay);
                }
            }
        }else if(this.name === 'enemy'){
            // console.log(this.pos);
            if(this.bulletY + BULLET_SIZE >= this.pos[1] && this.bulletY <= this.pos[1] + TANK_SIZE && this.bulletX + BULLET_SIZE >= this.pos[0] && this.bulletX <= this.pos[0] + TANK_SIZE){
                // console.log(1);
                //взрыв и звук
                cancelAnimationFrame(id);
                this.model.revivalPlayer();
    
                setTimeout(() => {
                    this.timer = true;
                    this.bullet = false;
                }, this.delay);
            }
        }
            
    }

    //столкновение пули, когда она летит вправо
    this.checkCollisionBulletRight = function(id){
        this.blocks.find((item, index) => {
            if(!item){
                this.blocks.splice(index, 0);
            } else{
                if(item.material !== 42 && this.bulletY + BULLET_SIZE >= item.y && this.bulletY <= item.y + item.height && this.bulletX + BULLET_SIZE >= item.x && this.bulletX <= item.x + item.width){

                    cancelAnimationFrame(id);

                    // this.explosion(17, this.soundBulletHit2);

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
                    
                    setTimeout(() => {
                        this.timer = true;
                        this.bullet = false;
                    }, this.delay);
                }
            }
        })   

        //столкновение с орлом
        if(this.bulletY + BULLET_SIZE >= 24 * BLOCK_HEIGHT && this.bulletY <= 24 * BLOCK_HEIGHT + EAGLE_SIZE && this.bulletX + BULLET_SIZE >= 12 * BLOCK_WIDTH && this.bulletX <= 12 * BLOCK_WIDTH + EAGLE_SIZE){
            // this.Model.explosion(19, this.soundExplosion2);

            cancelAnimationFrame(id);
            this.eagleState = 21;
            // this.Model.gameOver();
        }
        
        //столкновение с границами карты
        if(this.bulletX > CANVAS_WIDTH - BULLET_SIZE){
            // this.soundBulletHit1.play();
            // this.bullet = false;
            cancelAnimationFrame(id);

            //задержка, чтобы пули не вылетали сразу же после сталкивания
            setTimeout(() => {
                this.timer = true;
                this.bullet = false;
            }, this.delay);
        }

        if(this.name === 'player'){
            for(let i = 0; i < this.pos.length; i++){
                if(this.bulletY + BULLET_SIZE >= this.pos[i].y && this.bulletY <= this.pos[i].y + TANK_SIZE && this.bulletX + BULLET_SIZE >= this.pos[i].x && this.bulletX <= this.pos[i].x + TANK_SIZE){
                    if(this.pos[i].redTank){
                        // this.bonusCoordinate();
                        // requestAnimationFrame(this.showBonuses);
                    }

                    this.model.tankKilled(i, this.enemises, this.enemises);
    
                    cancelAnimationFrame(id);
    
                    setTimeout(() => {
                        this.timer = true;
                        this.bullet = false;
                    }, this.delay);
                }
            }
        }else if(this.name === 'enemy'){
            if(this.bulletY + BULLET_SIZE >= this.pos[1] && this.bulletY <= this.pos[1] + TANK_SIZE && this.bulletX + BULLET_SIZE >= this.pos[0] && this.bulletX <= this.pos[0] + TANK_SIZE){
                //взрыв и звук
                cancelAnimationFrame(id);
                this.model.revivalPlayer();
    
                setTimeout(() => {
                    this.timer = true;
                    this.bullet = false;
                }, this.delay);
            }
        }
    }

    //столкновение пули, когда она летит вниз
    this.checkCollisionBulletDown = function(id){
        this.blocks.find((item, index) => {
            if(!item){
                this.blocks.splice(index, 0);
            } else{
                if(item.material !== 42 && this.bulletX + BULLET_SIZE >= item.x && this.bulletX <= item.x + item.width && this.bulletY + BULLET_SIZE <= item.y + item.height && this.bulletY + BULLET_SIZE >= item.y){

                    cancelAnimationFrame(id);

                    // this.explosion(17, this.soundBulletHit2);

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

                    setTimeout(() => {
                        this.timer = true;
                        this.bullet = false;
                    }, this.delay);
                }
            }
        })

        //столкновение с орлом
        if(this.bulletX + BULLET_SIZE >= 12 * BLOCK_WIDTH && this.bulletX <= 12 * BLOCK_WIDTH + EAGLE_SIZE && this.bulletY + BULLET_SIZE <= 24 * BLOCK_HEIGHT + EAGLE_SIZE && this.bulletY + BULLET_SIZE >= 24 * BLOCK_HEIGHT){
            // this.explosion(19, this.soundExplosion2);
            cancelAnimationFrame(id);
            this.eagleState = 21;
            this.model.gameOver();
        }

        //столкновение с границами карты
        if(this.bulletY > CANVAS_HEIGHT - BULLET_SIZE){
            // this.soundBulletHit1.play();
            // this.bullet = false;
            cancelAnimationFrame(id);

            setTimeout(() => {
                this.timer = true;
                this.bullet = false;
            }, this.delay);
        }

        if(this.name === 'player'){
            for(let i = 0; i < this.pos.length; i++){
                if(this.bulletX + BULLET_SIZE >= this.pos[i].x && this.bulletX <= this.pos[i].x + TANK_SIZE && this.bulletY + BULLET_SIZE >= this.pos[i].y && this.bulletY + BULLET_SIZE <= this.pos[i].y + TANK_SIZE){
                    if(this.pos[i].redTank){
                        // this.bonusCoordinate();
                        // requestAnimationFrame(this.showBonuses);
                    }

                    this.model.tankKilled(i, this.enemises);
    
                    cancelAnimationFrame(id);
    
                    setTimeout(() => {
                        this.timer = true;
                        this.bullet = false;
                    }, this.delay);
                }
            }
        }else if(this.name === 'enemy'){
            if(this.bulletX + BULLET_SIZE >= this.pos[0] && this.bulletX <= this.pos[0] + TANK_SIZE && this.bulletY + BULLET_SIZE >= this.pos[1] && this.bulletY + BULLET_SIZE <= this.pos[1] + TANK_SIZE){
                //взрыв и звук
                cancelAnimationFrame(id);
                this.model.revivalPlayer();
    
                setTimeout(() => {
                    this.timer = true;
                    this.bullet = false;
                }, this.delay);
            }
        }
    }

    //столкновение пули, когда она летит вверх
    this.checkCollisionBulletUp = function(id){
        this.blocks.find((item, index) => {
            if(!item){
                this.blocks.splice(index, 0);
            } else{
                if(item.material !== 42 && this.bulletX + BULLET_SIZE >= item.x && this.bulletX <= item.x + item.width && this.bulletY <= item.y + item.height && this.bulletY >= item.y){

                cancelAnimationFrame(id);

                // this.explosion(17, this.soundBulletHit2);

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

                setTimeout(() => {
                    this.timer = true;
                    this.bullet = false;
                }, this.delay);
                }
            }
        })

        //столкновение с границами карты
        if(this.bulletY <= 0){
            // this.soundBulletHit1.play();
            // this.bullet = false;
            cancelAnimationFrame(id);

            //задержка, чтобы пули не вылетали сразу же после сталкивания
            setTimeout(() => {
                this.timer = true;
                this.bullet = false;
            }, this.delay);
        }

        if(this.name === 'player'){
            for(let i = 0; i < this.pos.length; i++){
                if(this.bulletX + BULLET_SIZE >= this.pos[i].x && this.bulletX <= this.pos[i].x + TANK_SIZE && this.bulletY >= this.pos[i].y && this.bulletY <= this.pos[i].y + TANK_SIZE){
                    if(this.pos[i].redTank){
                        // this.bonusCoordinate();
                        // requestAnimationFrame(this.showBonuses);
                    }

                    this.model.tankKilled(i, this.enemises);
    
                    cancelAnimationFrame(id);
    
                    setTimeout(() => {
                        this.timer = true;
                        this.bullet = false;
                    }, this.delay);
                }
            }
        }else if(this.name === 'enemy'){
            if(this.bulletX + BULLET_SIZE >= this.pos[0] && this.bulletX <= this.pos[0] + TANK_SIZE && this.bulletY >= this.pos[1] && this.bulletY <= this.pos[1] + TANK_SIZE){
                //взрыв и звук
                cancelAnimationFrame(id);
                this.model.revivalPlayer();
    
                setTimeout(() => {
                    this.timer = true;
                    this.bullet = false;
                }, this.delay);
            }
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
        
        this.bulletY += this.speedBulletY;
        this.bulletX += this.speedBulletX;

        // console.log(this.bulletDirection);

        this.view.drawBullet(this.bulletDirection, this.bulletX, this.bulletY);
    }

    this.loop = () => {
        this.setPosBullet();

        this.anim = requestAnimationFrame(this.loop);
    }
}