import { BLOCK_WIDTH, BLOCK_HEIGHT, CANVAS_HEIGHT, CANVAS_WIDTH, BULLET_SIZE, EXPLOSION_SIZE, EAGLE_SIZE, TANK_SIZE, MEASUREMENT_ERROR, BONUS_SIZE } from "./constants.js";
import { Bullet } from "./bullet.js";

export function Player(){
    this.key = 'ArrowUp';
    this.numLives = 2;
    this.countStar = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.isMoving = false;
    this.isShoots = false;
    // this.game = false; //закончилась игра или нет
    this.enemiesPos = [];
    this.bullet = new Bullet();

    this.init = function(view, model){
        this.view = view;
        this.model = model;
        // this.blocks = blocks;
        // this.enemiesPos = enemiesPos;
        // this.enemises = enemises;
        // this.soundMovement = soundMovement;
        // this.soundMotor = soundMotor;
    }

    this.getPos = function(posX, posY){
        this.posX = posX;
        this.posY = posY;
    }
    //перерождение
    this.revivalPlayer = function(){
        this.countStar = 0;
        this.numLives--;

        // if(this.numLives <= 0){
        //     this.gameOver();
        // }

        this.view.changeNumLives(this.numLives);


        this.posX = 9 * BLOCK_WIDTH;
        this.posY = CANVAS_HEIGHT - TANK_SIZE;
    }

    this.playerCollision = function(){
        switch (this.key) {
            case 'ArrowUp':
                // if(this.posX + TANK_SIZE >= this.bonusX && this.posX <= this.bonusX + BONUS_SIZE && this.posY <= this.bonusY + BONUS_SIZE && this.posY >= this.bonusY){
                //     this.score += 500;
                //     this.sondPickBonus.play();
                //     // cancelAnimationFrame(this.bonusAnimId);
                //     // this.bonusX = null;
                //     // this.bonusY = null;
                //     // this.bonus = null;
                //     // this.bonuses();
                // }

                // for(let i = 0; i < this.enemiesPos.length; i++){
                //     if(this.posX + TANK_SIZE >= this.enemiesPos[i].x && this.posX <= this.enemiesPos[i].x + TANK_SIZE && this.posY <= this.enemiesPos[i].y + TANK_SIZE && this.posY >= this.enemiesPos[i].y){
                //         this.speedY = 0;
                //     }
                // }
                
                this.blocks.find(item => {
                    if(item.material !== 42 && this.posX + TANK_SIZE > item.x + MEASUREMENT_ERROR && this.posX < item.x + BLOCK_WIDTH - MEASUREMENT_ERROR && this.posY === item.y + BLOCK_HEIGHT - MEASUREMENT_ERROR){
                        this.speedY = 0;
                    }
                })
                
                //столкновение с границами карты
                if(this.posY < 0){
                    this.speedY = 0;
                }
                break;
        
            case 'ArrowDown':
                // if(this.posX + TANK_SIZE >= this.bonusX && this.posX <= this.bonusX + BONUS_SIZE && this.posY + TANK_SIZE >= this.bonusY && this.posY + TANK_SIZE <= this.bonusY + BONUS_SIZE){
                //     this.score += 500;
                //     this.sondPickBonus.play();
                //     // cancelAnimationFrame(this.bonusAnimId);
                //     // this.bonusX = null;
                //     // this.bonusY = null;
                //     // this.bonus = null;
                //     // this.bonuses();
                // }

                // for(let i = 0; i < this.enemiesPos.length; i++){
                //     if(this.posX + TANK_SIZE >= this.enemiesPos[i].x && this.posX <= this.enemiesPos[i].x + TANK_SIZE && this.posY + TANK_SIZE >= this.enemiesPos[i].y && this.posY + TANK_SIZE <= this.enemiesPos[i].y + TANK_SIZE){
                //         this.speedY = 0;
                //     }
                // }

                this.blocks.find(item => {
                    if(item.material !== 42 && this.posX + TANK_SIZE > item.x + MEASUREMENT_ERROR && this.posX < item.x + BLOCK_WIDTH - MEASUREMENT_ERROR && this.posY + TANK_SIZE === item.y + MEASUREMENT_ERROR){
                        this.speedY = 0;
                    }
                })

                //столкновение с орлом
                if(this.posX + TANK_SIZE > 12 * BLOCK_WIDTH + MEASUREMENT_ERROR && this.posX < 12 * BLOCK_WIDTH + EAGLE_SIZE - MEASUREMENT_ERROR && this.posY + TANK_SIZE === 24 * BLOCK_HEIGHT + MEASUREMENT_ERROR){
                    this.speedY = 0;
                }

                //столкновение с границами карты
                if(this.posY > CANVAS_HEIGHT - TANK_SIZE){
                    this.speedY = 0;
                }
                break;
        
            case 'ArrowLeft':
                // if(this.posX >= this.bonusX && this.posX <= this.bonusX + BONUS_SIZE && this.posY + TANK_SIZE >= this.bonusY && this.posY <= this.bonusY + BONUS_SIZE){
                //     this.score += 500;
                //     this.sondPickBonus.play();
                //     // cancelAnimationFrame(this.bonusAnimId);
                //     // this.bonusX = null;
                //     // this.bonusY = null;
                //     // this.bonus = null;
                //     // this.bonuses();
                // }

                // for(let i = 0; i < this.enemiesPos.length; i++){
                //     if(this.posX <= this.enemiesPos[i].x + TANK_SIZE && this.posX >= this.enemiesPos[i].x && this.posY + TANK_SIZE >= this.enemiesPos[i].y && this.posY <= this.enemiesPos[i].y + TANK_SIZE){
                //         this.speedX = 0;
                //     }
                // }

                this.blocks.find(item => {
                    if(item.material !== 42 && this.posX === item.x + BLOCK_WIDTH - MEASUREMENT_ERROR && this.posY + TANK_SIZE > item.y + MEASUREMENT_ERROR && this.posY < item.y + BLOCK_HEIGHT - MEASUREMENT_ERROR){
                        this.speedX = 0;
                    }
                })

                //столкновение с орлом
                if(this.posX === 12 * BLOCK_WIDTH + EAGLE_SIZE - MEASUREMENT_ERROR && this.posY + TANK_SIZE > 24 * BLOCK_HEIGHT + MEASUREMENT_ERROR && this.posY < 24 * BLOCK_HEIGHT + EAGLE_SIZE - MEASUREMENT_ERROR){
                    this.speedX = 0;
                }

                //столкновение с границами карты
                if(this.posX < 0){
                    this.speedX = 0;
                }
                break;
        
            case 'ArrowRight':
                // if(this.posX + TANK_SIZE >= this.bonusX && this.posX + TANK_SIZE <= this.bonusX + BONUS_SIZE && this.posY + TANK_SIZE >= this.bonusY && this.posY <= this.bonusY + BONUS_SIZE){
                //     this.sondPickBonus.play();
                //     this.score += 500;
                //     // cancelAnimationFrame(this.bonusAnimId);
                //     // this.bonusX = null;
                //     // this.bonusY = null;
                //     // this.bonus = null;
                //     // this.bonuses();
                // }

                // for(let i = 0; i < this.enemiesPos.length; i++){
                //     if(this.posX + TANK_SIZE >= this.enemiesPos[i].x && this.posX + TANK_SIZE <= this.enemiesPos[i].x + TANK_SIZE && this.posY + TANK_SIZE >= this.enemiesPos[i].y && this.posY <= this.enemiesPos[i].y + TANK_SIZE){
                //         this.speedX = 0;
                //     }
                // }

                this.blocks.find(item => {
                    if(item.material !== 42 && this.posX + TANK_SIZE === item.x + MEASUREMENT_ERROR && this.posY + TANK_SIZE > item.y + MEASUREMENT_ERROR && this.posY < item.y + BLOCK_HEIGHT - MEASUREMENT_ERROR){
                        this.speedX = 0;
                    }
                })
                
                //столкновение с орлом
                if(this.posX + TANK_SIZE === 12 * BLOCK_WIDTH + MEASUREMENT_ERROR && this.posY + TANK_SIZE > 24 * BLOCK_HEIGHT + MEASUREMENT_ERROR && this.posY < 24 * BLOCK_HEIGHT + EAGLE_SIZE - MEASUREMENT_ERROR){
                    this.speedX = 0;
                }
                
                //столкновение с границами карты
                if(this.posX > CANVAS_WIDTH - TANK_SIZE){
                    this.speedX = 0;
                }
                break;
        
            default:
                break;
        }
    }

    this.getParams = function(blocks, enemiesPos, enemises){
        this.blocks = blocks;
        this.enemiesPos = enemiesPos;
        this.enemises = enemises;
        // this.soundMovement = soundMovement;
        // this.soundMotor = soundMotor;
    }

    this.playerMovement = function(){
        if(this.isMoving){
            this.soundMovement.play();
            this.soundMotor.pause();
            switch (this.key) {
                case 'ArrowUp':
                    this.speedY = -2;
                    this.speedX = 0;

                    this.playerCollision();
                    
                    this.posY += this.speedY;

                    this.view.drawPlayerOne(7, this.posX, this.posY);
                    break;
                case 'ArrowDown':
                    this.speedY = 2;
                    this.speedX = 0;

                    this.playerCollision();

                    this.posY += this.speedY;

                    this.view.drawPlayerOne(9, this.posX, this.posY);
                    break;
                case 'ArrowLeft':
                    this.speedX = -2;
                    this.speedY = 0;

                    this.playerCollision();

                    this.posX += this.speedX;

                    this.view.drawPlayerOne(10, this.posX, this.posY);
                    break;
                case 'ArrowRight':
                    this.speedX = 2;
                    this.speedY = 0;

                    this.playerCollision();

                    this.posX += this.speedX;

                    this.view.drawPlayerOne(8, this.posX, this.posY);
                    break;
                default:
                    break;
            }
        } 
        else if(!this.isMoving){
            this.soundMotor.play();
            this.soundMovement.pause();
            switch (this.key) {
                case 'ArrowUp':
                    this.speedY = 0;
                    this.view.drawPlayerOne(7, this.posX, this.posY);
                    break;
                case 'ArrowDown':
                    this.speedY = 0;
                    this.view.drawPlayerOne(9, this.posX, this.posY);
                    break;
                case 'ArrowLeft':
                    this.speedX = 0;
                    this.view.drawPlayerOne(10, this.posX, this.posY);
                    break;
                case 'ArrowRight':
                    this.speedX = 0;
                    this.view.drawPlayerOne(8, this.posX, this.posY);
                    break;
                default:
                    break;
            } 
        }
        this.model.getPlayerPos(this.posX, this.posY);
    }

    this.playerShoots = () => {
        this.bullet.init(this.view, this.model, this.model, 'player', this.key, this.posX, this.posY, 4, 500, this.blocks, this.enemiesPos, this);

        if(this.isShoots){
            this.bullet.setPosBullet();
        }
    }
}