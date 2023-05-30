import { TANK_SIZE, CANVAS_WIDTH, CANVAS_HEIGHT, MEASUREMENT_ERROR, EAGLE_SIZE, BLOCK_WIDTH, BLOCK_HEIGHT, BULLET_SIZE, EXPLOSION_SIZE } from "./constants.js";

export function Tank(){
    this.bullet = false;
    this.timer = true;
    this.flag = true;
    this.mainAnim = true;
    this.eagleState = 20;
    this.i = 15;
    this.soundShoot = new Audio('sound/sound_bullet_shot.ogg');
    this.soundBulletHit1 = new Audio('sound/sound_bullet_hit_1.ogg');
    this.soundBulletHit2 = new Audio('sound/sound_bullet_hit_2.ogg');
    this.soundExplosion2 = new Audio('sound/sound_explosion_2.ogg');

    this.init = (name, view, player, x, y, speed, delay) => {
        this.name = name;
        this.view = view;
        this.player = player;
        this.posX = x;
        this.posY = y;
        this.speed = speed;
        this.delay = delay;
    }

    this.getParams = function(direction){
        this.direction = direction;

        if(this.name === 'enemy'){
            this.getRandomDirection();
        }
    }

    this.getRandomDirection = () => {
        this.direction = Math.floor(Math.random() * (29 - 26 + 1)) + 26;
    }

    //движение танка
    this.setSpeed = function(){
        switch (this.direction) {
            case 26:
            case 30:
                this.speedY = -1;
                this.speedX = 0;
                break;
            case 34:
            case 38:
            case 7:
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
            case 8:
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
            case 9:
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
            case 10:
                this.speedY = 0;
                this.speedX = -2;
                break;
        
            default:
                break;
        }
    }

    this.checkCollision = function(){
        switch (this.direction) {
            case 26:
            case 30:
            case 34:
            case 38:
            case 7:
                //столкновение с блоками
                this.player.blocks.find(item => {
                    if(item.material !== 42 && this.posX + TANK_SIZE > item.x + MEASUREMENT_ERROR && this.posX < item.x + BLOCK_WIDTH - MEASUREMENT_ERROR && this.posY <= item.y + BLOCK_HEIGHT - MEASUREMENT_ERROR && this.posY >= item.y + MEASUREMENT_ERROR){
                        if(this.name === 'enemy'){
                            this.speedY =- this.speedY;
                            this.posY = item.y + BLOCK_HEIGHT;
                            this.getRandomDirection();
                        }else{
                            this.speedY = 0;
                        }
                    }
                })
                
                //столкновение с границами карты
                if (this.posY <= 0) {
                    if(this.name === 'enemy'){
                        this.speedY =- this.speedY;
                        this.posY = 0;
                        this.getRandomDirection();
                    }else{
                        this.speedY = 0;
                    }
                }
                break;
        
            case 28:
            case 32:
            case 36:
            case 40:
            case 9:
                //столкновение с блоками
                this.player.blocks.find(item => {
                    if(item.material !== 42 && this.posX + TANK_SIZE > item.x + MEASUREMENT_ERROR && this.posX < item.x + BLOCK_WIDTH - MEASUREMENT_ERROR && this.posY + TANK_SIZE >= item.y + MEASUREMENT_ERROR && this.posY + TANK_SIZE <= item.y + BLOCK_HEIGHT - MEASUREMENT_ERROR){
                        if(this.name === 'enemy'){
                            this.speedY =- this.speedY;
                            this.posY = item.y - TANK_SIZE;
                            this.getRandomDirection();
                        }else{
                            this.speedY = 0;
                        }
                    }
                })

                //столкновение с орлом
                if(this.posX + TANK_SIZE > 12 * BLOCK_WIDTH + MEASUREMENT_ERROR && this.posX < 12 * BLOCK_WIDTH + EAGLE_SIZE - MEASUREMENT_ERROR && this.posY + TANK_SIZE >= 24 * BLOCK_HEIGHT + MEASUREMENT_ERROR && this.posY + TANK_SIZE <= 24 * BLOCK_HEIGHT + BLOCK_HEIGHT - MEASUREMENT_ERROR){
                    if(this.name === 'enemy'){
                        this.speedY =- this.speedY;
                        this.posY = 24 * BLOCK_HEIGHT - TANK_SIZE;
                        this.getRandomDirection();
                    }else{
                        this.speedY = 0;
                    }
                }

                //столкновение с границами карты
                if (this.posY + TANK_SIZE >= CANVAS_HEIGHT ) {
                    if(this.name === 'enemy'){
                        this.speedY =- this.speedY;
                        this.posY = CANVAS_HEIGHT - TANK_SIZE;
                        this.getRandomDirection();
                    }else{
                        this.speedY = 0;
                    }
                }
                break;
        
            case 29:
            case 33:
            case 37:
            case 41:
            case 10:
                //столкновение с блоками
                this.player.blocks.find(item => {
                    if(item.material !== 42 && this.posX <= item.x + BLOCK_WIDTH - MEASUREMENT_ERROR && this.posX >= item.x + MEASUREMENT_ERROR && this.posY + TANK_SIZE > item.y + MEASUREMENT_ERROR && this.posY < item.y + BLOCK_HEIGHT - MEASUREMENT_ERROR){
                        if(this.name === 'enemy'){
                            this.speedX =- this.speedX;
                            this.posX = item.x + BLOCK_WIDTH;
                            this.getRandomDirection();
                        }else{
                            this.speedX = 0;
                        }
                    }
                })

                //столкновение с орлом
                if(this.posX <= 12 * BLOCK_WIDTH + EAGLE_SIZE - MEASUREMENT_ERROR && this.posX >= 12 * BLOCK_WIDTH + MEASUREMENT_ERROR && this.posY + TANK_SIZE > 24 * BLOCK_HEIGHT + MEASUREMENT_ERROR && this.posY < 24 * BLOCK_HEIGHT + EAGLE_SIZE - MEASUREMENT_ERROR){
                    if(this.name === 'enemy'){
                        this.speedX =- this.speedX;
                        this.posX = 12 * BLOCK_WIDTH + EAGLE_SIZE;
                        this.getRandomDirection();
                    }else{
                        this.speedX = 0;
                    }
                }

                //столкновение с границами карты
                if(this.posX <= 0){
                    if(this.name === 'enemy'){
                        this.speedX =- this.speedX;
                        this.posX = 0;
                        this.getRandomDirection();
                    }else{
                        this.speedX = 0;
                    }
                }
                break;
        
            case 27:
            case 31:
            case 35:
            case 39:
            case 8:
                //столкновение с блоками
                this.player.blocks.find(item => {
                    if(item.material !== 42 && this.posX + TANK_SIZE >= item.x + MEASUREMENT_ERROR && this.posX + TANK_SIZE <= item.x + BLOCK_WIDTH - MEASUREMENT_ERROR && this.posY + TANK_SIZE > item.y + MEASUREMENT_ERROR && this.posY < item.y + BLOCK_HEIGHT - MEASUREMENT_ERROR){
                        if(this.name === 'enemy'){
                            this.speedX =- this.speedX;
                            this.posX = item.x - TANK_SIZE;
                            this.getRandomDirection();
                        }else{
                            this.speedX = 0;
                        }
                    }
                })
                
                //столкновение с орлом
                if(this.posX + TANK_SIZE >= 12 * BLOCK_WIDTH + MEASUREMENT_ERROR && this.posX + TANK_SIZE <= 12 * BLOCK_WIDTH + EAGLE_SIZE - MEASUREMENT_ERROR && this.posY + TANK_SIZE > 24 * BLOCK_HEIGHT + MEASUREMENT_ERROR && this.posY < 24 * BLOCK_HEIGHT + EAGLE_SIZE - MEASUREMENT_ERROR){
                    if(this.name === 'enemy'){
                        this.speedX =- this.speedX;
                        this.posX = 12 * BLOCK_WIDTH - TANK_SIZE;
                        this.getRandomDirection();
                    }else{
                        this.speedX = 0;
                    }
                }
                
                //столкновение с границами карты
                if(this.posX + TANK_SIZE >= CANVAS_WIDTH){
                    if(this.name === 'enemy'){
                        this.speedX =- this.speedX;
                        this.posX = CANVAS_WIDTH - TANK_SIZE;
                        this.getRandomDirection();
                    }else{
                        this.speedX = 0;
                    }
                }
                break;
        
            default:
                break;
        }

        this.posX += this.speedX;
        this.posY += this.speedY;
    }

    this.drawTank = () => {
        this.view.drawTank(this.direction, this.posX, this.posY);
    }

    //стрельба
    this.setPosBullet = () => {
        if(!this.bullet && this.timer){
            if(this.name === 'player'){
                this.soundShoot.play();
            }
            this.bullet = true;
            switch (this.direction) {
                case 26:
                case 30:
                case 34:
                case 38:
                case 7:
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
                case 9:
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
                case 10:
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
                case 8:
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

    this.bulletMovement = () => {
        this.timer = false;
        if(this.player.flag && this.flag){
            requestAnimationFrame(this.bulletMovement);
        }

        switch (this.bulletDirection) {
            case 11:
                this.checkCollisionBulletUp();
                break;
            case 13:
                this.checkCollisionBulletDown();
                break;
            case 14:
                this.checkCollisionBulletLeft();
                break;
            case 12:
                this.checkCollisionBulletRight();
                break;
        
            default:
                break;
        }
        
        this.bulletY += this.speedBulletY;
        this.bulletX += this.speedBulletX;

        this.view.drawBullet(this.bulletDirection, this.bulletX, this.bulletY);
    }

    //столкновение пули, когда она летит влево
    this.checkCollisionBulletLeft = function(){
        this.player.blocks.find((item, index) => {
            if(!item){
                this.player.blocks.splice(index, 0);
            } else{
                if(item.material !== 42 && item.material !== 43 && this.bulletY + BULLET_SIZE >= item.y && this.bulletY <= item.y + item.height && this.bulletX + BULLET_SIZE >= item.x && this.bulletX <= item.x + item.width){
                    this.flag = false;
                    if(this.name === 'player'){
                        this.soundBulletHit2.play();
                    }

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
                            this.player.blocks.splice(index, 1);
                        } else{
                            item.material = 6;

                            item.width = 16;
                            item.height = 24;
                        }
                    }

                    setTimeout(() => {
                        this.timer = true;
                        this.bullet = false;
                        this.flag = true;
                    }, this.delay);
                }
            }
        })

        //столкновение с орлом
        if(this.bulletY + BULLET_SIZE >= 24 * BLOCK_HEIGHT && this.bulletY <= 24 * BLOCK_HEIGHT + EAGLE_SIZE && this.bulletX + BULLET_SIZE >= 12 * BLOCK_WIDTH && this.bulletX <= 12 * BLOCK_WIDTH + EAGLE_SIZE){
            this.explosion();
            this.flag = false;
            this.player.eagleState = 21;
            this.player.gameOver();
        }
      
        //столкновение с границами карты
        if(this.bulletX <= 0){
            this.flag = false;

            if(this.name === 'player'){
                this.soundBulletHit1.play();
            }

            setTimeout(() => {
                this.timer = true;
                this.bullet = false;
                this.flag = true;
            }, this.delay);

        }

        if(this.name === 'player'){
            for(let i = 0; i < this.player.enemies.length; i++){
                if(this.bulletX + BULLET_SIZE >= this.player.enemies[i].posX && this.bulletX <= this.player.enemies[i].posX + TANK_SIZE && this.bulletY >= this.player.enemies[i].posY && this.bulletY <= this.player.enemies[i].posY + TANK_SIZE){
                    this.explosion();

                    this.flag = false;

                    this.player.tankKilled(i);

                    setTimeout(() => {
                        this.timer = true;
                        this.bullet = false;
                        this.flag = true;
                    }, this.delay);
                }
            }
        }
        else if(this.name === 'enemy'){
            if(this.bulletY + BULLET_SIZE >= this.player.tank.posY && this.bulletY <= this.player.tank.posY + TANK_SIZE && this.bulletX + BULLET_SIZE >= this.player.tank.posX && this.bulletX <= this.player.tank.posX + TANK_SIZE){
                this.explosion();

                this.flag = false;
                this.player.revivalPlayer();
    
                setTimeout(() => {
                    this.timer = true;
                    this.bullet = false;
                    this.flag = true;
                }, this.delay);
            }
        }
    }

    //столкновение пули, когда она летит вправо
    this.checkCollisionBulletRight = function(id){
        this.player.blocks.find((item, index) => {
            if(!item){
                this.player.blocks.splice(index, 0);
            } else{
                if(item.material !== 42 && item.material !== 43 && this.bulletY + BULLET_SIZE >= item.y && this.bulletY <= item.y + item.height && this.bulletX + BULLET_SIZE >= item.x && this.bulletX <= item.x + item.width){
                    if(this.name === 'player'){
                        this.soundBulletHit2.play();
                    }
                            this.flag = false;

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
                            this.player.blocks.splice(index, 1);
                        } else{
                            item.material = 3;

                            item.x = item.x + item.width / 2;

                            item.width = 16;
                            item.height = 24;
                        }
                    }
                    
                    setTimeout(() => {
                        this.timer = true;
                        this.bullet = false;
                        this.flag = true;
                    }, this.delay);
                }
            }
        })   

        //столкновение с орлом
        if(this.bulletY + BULLET_SIZE >= 24 * BLOCK_HEIGHT && this.bulletY <= 24 * BLOCK_HEIGHT + EAGLE_SIZE && this.bulletX + BULLET_SIZE >= 12 * BLOCK_WIDTH && this.bulletX <= 12 * BLOCK_WIDTH + EAGLE_SIZE){
            this.explosion();
            this.flag = false;
            this.player.eagleState = 21;
            this.player.gameOver();
        }
        
        //столкновение с границами карты
        if(this.bulletX > CANVAS_WIDTH - BULLET_SIZE){
            if(this.name === 'player'){
                this.soundBulletHit1.play();
            }
            this.flag = false;

            setTimeout(() => {
                this.timer = true;
                this.bullet = false;
                this.flag = true;
            }, this.delay);
        }

        if(this.name === 'player'){
            for(let i = 0; i < this.player.enemies.length; i++){
                if(this.bulletY + BULLET_SIZE >= this.player.enemies[i].posY && this.bulletY <= this.player.enemies[i].posY + TANK_SIZE && this.bulletX + BULLET_SIZE >= this.player.enemies[i].posX && this.bulletX <= this.player.enemies[i].posX + TANK_SIZE){
                    this.explosion();

                    this.player.tankKilled(i);
    
                    this.flag = false;

                    setTimeout(() => {
                        this.timer = true;
                        this.bullet = false;
                        this.flag = true;
                    }, this.delay);
                }
            }
        }else if(this.name === 'enemy'){
            if(this.bulletY + BULLET_SIZE >= this.player.tank.posY && this.bulletY <= this.player.tank.posY + TANK_SIZE && this.bulletX + BULLET_SIZE >= this.player.tank.posX && this.bulletX <= this.player.tank.posX + TANK_SIZE){
                this.explosion();
                    this.flag = false;
                this.player.revivalPlayer();
    
                setTimeout(() => {
                    this.timer = true;
                    this.bullet = false;
                    this.flag = true;
                }, this.delay);
            }
        }
    }

    //столкновение пули, когда она летит вниз
    this.checkCollisionBulletDown = function(id){
        this.player.blocks.find((item, index) => {
            if(!item){
                this.player.blocks.splice(index, 0);
            } else{
                if(item.material !== 42 && item.material !== 43 && this.bulletX + BULLET_SIZE >= item.x && this.bulletX <= item.x + item.width && this.bulletY + BULLET_SIZE <= item.y + item.height && this.bulletY + BULLET_SIZE >= item.y){
                    if(this.name === 'player'){
                        this.soundBulletHit2.play();
                    }
                            this.flag = false;

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
                            this.player.blocks.splice(index, 1);
                        } else{
                            item.material = 5;

                            item.y = item.y + item.height / 2;

                            item.width = 32;
                            item.height = 12;
                        }
                    }

                    setTimeout(() => {
                        this.timer = true;
                        this.bullet = false;
                        this.flag = true;
                    }, this.delay);
                }
            }
        })

        //столкновение с орлом
        if(this.bulletX + BULLET_SIZE >= 12 * BLOCK_WIDTH && this.bulletX <= 12 * BLOCK_WIDTH + EAGLE_SIZE && this.bulletY + BULLET_SIZE <= 24 * BLOCK_HEIGHT + EAGLE_SIZE && this.bulletY + BULLET_SIZE >= 24 * BLOCK_HEIGHT){
            this.explosion();
            this.flag = false;
            this.player.eagleState = 21;
            this.player.gameOver();
        }

        //столкновение с границами карты
        if(this.bulletY > CANVAS_HEIGHT - BULLET_SIZE){
            if(this.name === 'player'){
                this.soundBulletHit1.play();
            }
            this.flag = false;
                    

            setTimeout(() => {
                this.timer = true;
                this.bullet = false;
                this.flag = true;
            }, this.delay);
        }

        if(this.name === 'player'){
            for(let i = 0; i < this.player.enemies.length; i++){
                if(this.bulletX + BULLET_SIZE >= this.player.enemies[i].posX && this.bulletX <= this.player.enemies[i].posX + TANK_SIZE && this.bulletY + BULLET_SIZE >= this.player.enemies[i].posY && this.bulletY + BULLET_SIZE <= this.player.enemies[i].posY + TANK_SIZE){
                    this.explosion();

                    this.player.tankKilled(i);
    
                            this.flag = false;

                    setTimeout(() => {
                        this.timer = true;
                        this.bullet = false;
                        this.flag = true;
                    }, this.delay);
                }
            }
        }else if(this.name === 'enemy'){
            if(this.bulletX + BULLET_SIZE >= this.player.tank.posX && this.bulletX <= this.player.tank.posX + TANK_SIZE && this.bulletY + BULLET_SIZE <= this.player.tank.posY + TANK_SIZE && this.bulletY + BULLET_SIZE >= this.player.tank.posY){
                this.explosion();
                    this.flag = false;
                this.player.revivalPlayer();
    
                setTimeout(() => {
                    this.timer = true;
                    this.bullet = false;
                    this.flag = true;
                }, this.delay);
            }
        }
    }

    //столкновение пули, когда она летит вверх
    this.checkCollisionBulletUp = function(id){
        this.player.blocks.find((item, index) => {
            if(!item){
                this.player.blocks.splice(index, 0);
            } else{
                if(item.material !== 42 && item.material !== 43 && this.bulletX + BULLET_SIZE >= item.x && this.bulletX <= item.x + item.width && this.bulletY <= item.y + item.height && this.bulletY >= item.y){
                if(this.name === 'player'){
                    this.soundBulletHit2.play();
                }
                    this.flag = false;

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
                        this.player.blocks.splice(index, 1);
                    } else{
                        item.material = 4;
                        item.width = 32;
                        item.height = 12;
                    }
                }

                setTimeout(() => {
                    this.timer = true;
                    this.bullet = false;
                    this.flag = true;
                }, this.delay);
                }
            }
        })

        //столкновение с границами карты
        if(this.bulletY <= 0){
            if(this.name === 'player'){
                this.soundBulletHit1.play();
            }

            this.flag = false;

            setTimeout(() => {
                this.timer = true;
                this.bullet = false;
                this.flag = true;
            }, this.delay);
        }

        if(this.name === 'player'){
            for(let i = 0; i < this.player.enemies.length; i++){
                if(this.bulletX + BULLET_SIZE >= this.player.enemies[i].posX && this.bulletX <= this.player.enemies[i].posX + TANK_SIZE && this.bulletY >= this.player.enemies[i].posY && this.bulletY <= this.player.enemies[i].posY + TANK_SIZE){
                    this.explosion();
                    this.player.tankKilled(i);
                    this.flag = false;

                    setTimeout(() => {
                        this.timer = true;
                        this.bullet = false;
                        this.flag = true;
                    }, this.delay);
                }
            }
        }else if(this.name === 'enemy'){
            if(this.bulletX + BULLET_SIZE >= this.player.tank.posX && this.bulletX <= this.player.tank.posX + TANK_SIZE && this.bulletY <= this.player.tank.posY + TANK_SIZE && this.bulletY >= this.player.tank.posY){
                this.explosion();
                this.flag = false;
                this.player.revivalPlayer();
    
                setTimeout(() => {
                    this.timer = true;
                    this.bullet = false;
                    this.flag = true;
                }, this.delay);
            }
        }
    }

    //взрыв
    this.drawExplosion = () => {
        this.view.drawExplosion(this.i, this.bulletX + TANK_SIZE / 2 - EXPLOSION_SIZE, this.bulletY - EXPLOSION_SIZE, EXPLOSION_SIZE * 2, EXPLOSION_SIZE * 2);

        if(this.animation){
            requestAnimationFrame(this.drawExplosion);
        } 
    }

    this.explosion = function(){
        this.animation = true;
        requestAnimationFrame(this.drawExplosion);

        const interval = setInterval(() => {
            this.i++;

            if(this.i > 19){
                this.animation = false;
                this.i = 15;
                clearInterval(interval);
            }
        }, 100);

        this.soundExplosion2.play();
    }

    this.delete = function(){
        this.flag = false;
        this.mainAnim = false;
    }

    this.loop = () => {
        this.setSpeed();
        this.checkCollision();
        this.drawTank();
        this.setPosBullet();

        if(this.mainAnim){
            requestAnimationFrame(this.loop);
        }
        
    }
}