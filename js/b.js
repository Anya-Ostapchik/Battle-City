import { TANK_SIZE, CANVAS_WIDTH, CANVAS_HEIGHT, EAGLE_SIZE, BLOCK_WIDTH, BLOCK_HEIGHT, BULLET_SIZE } from "./constants.js";

export function Bullet(){
    this.bulletY = 0; //позиция пули по Y
    this.bulletX = 0; //позиция пули по X
    this.bullet = false;
    this.timer = true;
    // this.eagleState = 20;
    // this.soundShoot = new Audio('sound/sound_bullet_shot.ogg');
    // this.soundBulletHit1 = new Audio('sound/sound_bullet_hit_1.ogg');
    // this.soundBulletHit2 = new Audio('sound/sound_bullet_hit_2.ogg');
    // this.soundExplosion1 = new Audio('sound/sound_explosion_1.ogg'); //взрыв танка
    // this.soundExplosion2 = new Audio('sound/sound_explosion_2.ogg'); //взрыв орла

    this.init = (view, model, name, speed, delay) => {
        this.view = view;
        this.model = model;
        this.name = name;
        this.speed = speed;
        this.delay = delay;
    }

    this.getParams = function(direction, posX, posY, blocks, pos){
        this.direction = direction;
        this.posX = posX;
        this.posY = posY;
        this.blocks = blocks;
        this.pos = pos;
    }

    this.setPosBullet = () => {
        if(!this.bullet && this.timer){
            if(this.name === 'player'){
                this.model.soundShoot.play();
            }
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
                    requestAnimationFrame(this.bulletMovement);
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
                    requestAnimationFrame(this.bulletMovement);
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
                    requestAnimationFrame(this.bulletMovement);
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
                    requestAnimationFrame(this.bulletMovement);
                    break;
            
                default:
                    break;
            }
        }
        this.id = requestAnimationFrame(this.setPosBullet);
    }

    //столкновение пули, когда она летит влево
    this.checkCollisionBulletLeft = function(id){
        this.blocks.find((item, index) => {
            if(!item){
                this.blocks.splice(index, 0);
            } else{
                if(item.material !== 42 && this.bulletY + BULLET_SIZE >= item.y && this.bulletY <= item.y + item.height && this.bulletX + BULLET_SIZE >= item.x && this.bulletX <= item.x + item.width){
                    cancelAnimationFrame(id);
                    cancelAnimationFrame(this.id);
                    if(this.name === 'player'){
                        this.model.soundBulletHit2.play();
                        
                    }
                    //взрыв

                    // this.Model.explosion(17);

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
                            this.blocks.splice(index, 1);
                        } else{
                            item.material = 6;

                            item.width = 16;
                            item.height = 24;
                        }
                    } else{
                        if(this.countStar === 3){
                            this.blocks.splice(index, 1);
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
            this.model.soundExplosion2.play();
            //взрыв
            // this.Model.explosion(19);

            cancelAnimationFrame(id);
                    cancelAnimationFrame(this.id);
            
            this.model.gameOver();
        }
      
        //столкновение с границами карты
        if(this.bulletX <= 0){
            cancelAnimationFrame(id);
                    cancelAnimationFrame(this.id);
            


            if(this.name === 'player'){
                this.model.soundBulletHit1.play();
                //взрыв
            }
            

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

                    this.model.soundExplosion2.play();
                    //взрыв
    
                    cancelAnimationFrame(id);
                    cancelAnimationFrame(this.id);

                    this.model.tankKilled(i);

    
                    setTimeout(() => {
                        this.timer = true;
                        this.bullet = false;
                    }, this.delay);
                }
            }
        }else if(this.name === 'enemy'){
            if(this.bulletY + BULLET_SIZE >= this.pos[1] && this.bulletY <= this.pos[1] + TANK_SIZE && this.bulletX + BULLET_SIZE >= this.pos[0] && this.bulletX <= this.pos[0] + TANK_SIZE){
                // this.soundExplosion2.play();
                //взрыв
                cancelAnimationFrame(id);
                    cancelAnimationFrame(this.id);
                

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
                    if(this.name === 'player'){
                        this.model.soundBulletHit2.play();
                    }
                    //взрыв
                    cancelAnimationFrame(id);
                    cancelAnimationFrame(this.id);
                    
                    


                    // this.explosion(17);

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
                            this.blocks.splice(index, 1);
                        } else{
                            item.material = 3;

                            item.x = item.x + item.width / 2;

                            item.width = 16;
                            item.height = 24;
                        }
                    } else{
                        if(this.countStar === 3){
                            this.blocks.splice(index, 1);
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
            this.model.soundExplosion2.play();
            //взрыв
            // this.Model.explosion(19);

            cancelAnimationFrame(id);
                    cancelAnimationFrame(this.id);
                    
            this.model.gameOver();
        }
        
        //столкновение с границами карты
        if(this.bulletX > CANVAS_WIDTH - BULLET_SIZE){
            if(this.name === 'player'){
                this.model.soundBulletHit1.play();
                //взрыв
            }
            cancelAnimationFrame(id);
                    cancelAnimationFrame(this.id);
                    

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
                    this.model.soundExplosion2.play();
                    //взрыв

                    this.model.tankKilled(i, this.enemises, this.enemises);
    
                    cancelAnimationFrame(id);
                    cancelAnimationFrame(this.id);
                    
    
                    setTimeout(() => {
                        this.timer = true;
                        this.bullet = false;
                    }, this.delay);
                }
            }
        }else if(this.name === 'enemy'){
            if(this.bulletY + BULLET_SIZE >= this.pos[1] && this.bulletY <= this.pos[1] + TANK_SIZE && this.bulletX + BULLET_SIZE >= this.pos[0] && this.bulletX <= this.pos[0] + TANK_SIZE){
                //взрыв
                this.model.soundExplosion2.play();
                cancelAnimationFrame(id);
                    cancelAnimationFrame(this.id);
                    
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
                    if(this.name === 'player'){
                        this.model.soundBulletHit2.play();
                    }
                    //взрыв
                    cancelAnimationFrame(id);
                    cancelAnimationFrame(this.id);
                    

                    // this.explosion(17);

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
                            this.blocks.splice(index, 1);
                        } else{
                            item.material = 5;

                            item.y = item.y + item.height / 2;

                            item.width = 32;
                            item.height = 12;
                        }
                    } else{
                        if(this.countStar === 3){
                            this.blocks.splice(index, 1);
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
            this.model.soundExplosion2.play();
            // this.explosion(19);
            cancelAnimationFrame(id);
                    cancelAnimationFrame(this.id);
                    
            this.model.gameOver();
        }

        //столкновение с границами карты
        if(this.bulletY > CANVAS_HEIGHT - BULLET_SIZE){
            if(this.name === 'player'){
                this.model.soundBulletHit1.play();
                //взрыв
            }
            cancelAnimationFrame(id);
                    cancelAnimationFrame(this.id);
                    

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
                    //взрыв
                    this.model.soundExplosion2.play();
                    this.model.tankKilled(i, this.enemises);
    
                    cancelAnimationFrame(id);
                    cancelAnimationFrame(this.id);
                    
    
                    setTimeout(() => {
                        this.timer = true;
                        this.bullet = false;
                    }, this.delay);
                }
            }
        }else if(this.name === 'enemy'){
            if(this.bulletX + BULLET_SIZE >= this.pos[0] && this.bulletX <= this.pos[0] + TANK_SIZE && this.bulletY + BULLET_SIZE >= this.pos[1] && this.bulletY + BULLET_SIZE <= this.pos[1] + TANK_SIZE){
                //взрыв
                this.model.soundExplosion2.play();
                cancelAnimationFrame(id);
                    cancelAnimationFrame(this.id);
                    
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
                if(this.name === 'player'){
                    this.model.soundBulletHit2.play();
                }
                //взрыв
                cancelAnimationFrame(id);
                    cancelAnimationFrame(this.id);
                    

                // this.explosion(17);

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
                        this.blocks.splice(index, 1);
                    } else{
                        item.material = 4;
                        item.width = 32;
                        item.height = 12;
                    }
                } else{
                    if(this.countStar === 3){
                        this.blocks.splice(index, 1);
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
            if(this.name === 'player'){
                this.model.soundBulletHit1.play();
                //взрыв
            }

            cancelAnimationFrame(id);
                    cancelAnimationFrame(this.id);
                    

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
                    this.model.soundExplosion2.play();
                    //взрыв

                    this.model.tankKilled(i, this.enemises);
    
                    cancelAnimationFrame(id);
                    cancelAnimationFrame(this.id);
                    
    
                    setTimeout(() => {
                        this.timer = true;
                        this.bullet = false;
                    }, this.delay);
                }
            }
        }else if(this.name === 'enemy'){
            if(this.bulletX + BULLET_SIZE >= this.pos[0] && this.bulletX <= this.pos[0] + TANK_SIZE && this.bulletY >= this.pos[1] && this.bulletY <= this.pos[1] + TANK_SIZE){
                //взрыв
                this.model.soundExplosion2.play();
                cancelAnimationFrame(id);
                    cancelAnimationFrame(this.id);
                    
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

        this.view.drawBullet(this.bulletDirection, this.bulletX, this.bulletY);
    }
}