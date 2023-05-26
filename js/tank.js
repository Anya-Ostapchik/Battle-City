import { TANK_SIZE, CANVAS_WIDTH, CANVAS_HEIGHT, MEASUREMENT_ERROR, EAGLE_SIZE, BLOCK_WIDTH, BLOCK_HEIGHT, BULLET_SIZE, EXPLOSION_SIZE } from "./constants.js";
// import { levels } from "./levels.js";
// import { Bullet } from "./b.js";


export function Collision(){

    this.init = (name, view) => {
        this.name = name;
        this.view = view;
    }

    this.collision = function(direction, blocks, x, y){
        this.posX = x;
        this.posY = y;
        this.direction = direction;
        this.blocks = blocks;
        switch (this.direction) {
            case 26:
            case 30:
            case 34:
            case 38:
            case 'ArrowUp':
                //столкновение с блоками
                this.blocks.find(item => {
                    if(item.material !== 42 && this.posX + TANK_SIZE >= item.x + MEASUREMENT_ERROR && this.posX <= item.x + BLOCK_WIDTH - MEASUREMENT_ERROR && this.posY <= item.y + BLOCK_HEIGHT - MEASUREMENT_ERROR && this.posY >= item.y + MEASUREMENT_ERROR){
                        if(this.name === 'enemy'){
                            this.speedY =- this.speedY;
                            this.posY = item.y + BLOCK_HEIGHT - MEASUREMENT_ERROR;
                            // this.getRandomDirection();
                        }else{
                            this.playerSpeedY = 0;
                        }
                    }
                })
                
                //столкновение с границами карты
                if (this.posY <= 0) {
                    if(this.name === 'enemy'){
                        this.speedY =- this.speedY;
                    this.posY = 0;
                        // this.getRandomDirection();
                    }else{
                        this.playerSpeedY = 0;
                    }
                    
                    // this.getRandomDirection();
                }
                break;
        
            case 28:
            case 32:
            case 36:
            case 40:
            case 'ArrowDown':
                //столкновение с блоками
                this.blocks.find(item => {
                    if(item.material !== 42 && this.posX + TANK_SIZE >= item.x + MEASUREMENT_ERROR && this.posX <= item.x + BLOCK_WIDTH - MEASUREMENT_ERROR && this.posY + TANK_SIZE >= item.y + MEASUREMENT_ERROR && this.posY + TANK_SIZE <= item.y + BLOCK_HEIGHT - MEASUREMENT_ERROR){
                        if(this.name === 'enemy'){
                            this.speedY =- this.speedY;
                            this.posY = item.y - TANK_SIZE + MEASUREMENT_ERROR;
                            // this.getRandomDirection();
                        }else{
                            this.playerSpeedY = 0;
                        }
                        
                    }
                })

                //столкновение с орлом
                if(this.posX + TANK_SIZE >= 12 * BLOCK_WIDTH + MEASUREMENT_ERROR && this.posX <= 12 * BLOCK_WIDTH + EAGLE_SIZE - MEASUREMENT_ERROR && this.posY + TANK_SIZE >= 24 * BLOCK_HEIGHT + MEASUREMENT_ERROR && this.posY + TANK_SIZE <= 24 * BLOCK_HEIGHT + BLOCK_HEIGHT - MEASUREMENT_ERROR){
                    if(this.name === 'enemy'){
                        this.speedY =- this.speedY;
                        this.posY = 24 * BLOCK_HEIGHT - TANK_SIZE + MEASUREMENT_ERROR;
                        // this.getRandomDirection();
                    }else{
                        this.playerSpeedY = 0;
                    }
                    
                }

                //столкновение с границами карты
                if (this.posY + TANK_SIZE >= CANVAS_HEIGHT ) {
                    if(this.name === 'enemy'){
                        this.speedY =- this.speedY;
                        this.posY = CANVAS_HEIGHT - TANK_SIZE;
                        // this.getRandomDirection();
                    }else{
                        this.playerSpeedY = 0;
                    }
                    
                }
                break;
        
            case 29:
            case 33:
            case 37:
            case 41:
            case 'ArrowLeft':
                //столкновение с блоками
                this.blocks.find(item => {
                    if(item.material !== 42 && this.posX <= item.x + BLOCK_WIDTH - MEASUREMENT_ERROR && this.posX >= item.x + MEASUREMENT_ERROR && this.posY + TANK_SIZE >= item.y + MEASUREMENT_ERROR && this.posY <= item.y + BLOCK_HEIGHT - MEASUREMENT_ERROR){
                        if(this.name === 'enemy'){
                            this.speedX =- this.speedX;
                            this.posX = item.x + BLOCK_WIDTH - MEASUREMENT_ERROR;
                        }else{
                            this.playerSpeedX = 0;
                        }
                        
                        // this.getRandomDirection();
                    }
                })

                //столкновение с орлом
                if(this.posX <= 12 * BLOCK_WIDTH + EAGLE_SIZE - MEASUREMENT_ERROR && this.posX >= 12 * BLOCK_WIDTH + MEASUREMENT_ERROR && this.posY + TANK_SIZE >= 24 * BLOCK_HEIGHT + MEASUREMENT_ERROR && this.posY <= 24 * BLOCK_HEIGHT + EAGLE_SIZE - MEASUREMENT_ERROR){
                    if(this.name === 'enemy'){
                        this.speedX =- this.speedX;
                        this.posX = 12 * BLOCK_WIDTH + EAGLE_SIZE - MEASUREMENT_ERROR;
                    }else{
                        this.playerSpeedX = 0;
                    }
                    
                    // this.getRandomDirection();
                }

                //столкновение с границами карты
                if(this.posX <= 0){
                    if(this.name === 'enemy'){
                        this.speedX =- this.speedX;
                        this.posX = 0;
                    }else{
                        this.playerSpeedX = 0;
                    }
                    
                    // this.getRandomDirection();
                }
                break;
        
            case 27:
            case 31:
            case 35:
            case 39:
            case 'ArrowRight':
                //столкновение с блоками
                this.blocks.find(item => {
                    if(item.material !== 42 && this.posX + TANK_SIZE >= item.x + MEASUREMENT_ERROR && this.posX + TANK_SIZE <= item.x + BLOCK_WIDTH - MEASUREMENT_ERROR && this.posY + TANK_SIZE >= item.y + MEASUREMENT_ERROR && this.posY <= item.y + BLOCK_HEIGHT - MEASUREMENT_ERROR){
                        if(this.name === 'enemy'){
                            this.speedX =- this.speedX;
                        this.posX = item.x - TANK_SIZE + MEASUREMENT_ERROR;
                        }else{
                            this.playerSpeedX = 0;
                        }
                        
                        // this.getRandomDirection();
                    }
                })
                
                //столкновение с орлом
                if(this.posX + TANK_SIZE >= 12 * BLOCK_WIDTH + MEASUREMENT_ERROR && this.posX + TANK_SIZE <= 12 * BLOCK_WIDTH + EAGLE_SIZE - MEASUREMENT_ERROR && this.posY + TANK_SIZE >= 24 * BLOCK_HEIGHT + MEASUREMENT_ERROR && this.posY <= 24 * BLOCK_HEIGHT + EAGLE_SIZE - MEASUREMENT_ERROR){
                    if(this.name === 'enemy'){
                        this.speedX =- this.speedX;
                        this.posX = 12 * BLOCK_WIDTH - TANK_SIZE + MEASUREMENT_ERROR;
                    }else{
                        this.playerSpeedX = 0;
                    }
                    
                    // this.getRandomDirection();
                }
                
                //столкновение с границами карты
                if(this.posX + TANK_SIZE >= CANVAS_WIDTH){
                    if(this.name === 'enemy'){
                        this.speedX =- this.speedX;
                    this.posX = CANVAS_WIDTH - TANK_SIZE;
                    }else{
                        this.playerSpeedX = 0;
                    }
                    
                    // this.getRandomDirection();
                }
                break;
        
            default:
                break;
        }

        this.posX += this.speedX;
        this.posY += this.speedY;

        this.view.drawEnemyTanks(this.direction, this.posX, this.posY);
    }
}