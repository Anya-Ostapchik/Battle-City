import { levels } from "./levels.js";
import { spriteMap } from "./sprite-map.js";
import { BLOCK_WIDTH, BLOCK_HEIGHT, CANVAS_HEIGHT, CANVAS_WIDTH,TANK_SIZE} from "./constants.js";
import { Tank } from "./tank.js";


export function Model(){
    this.direction = 7;
    this.i = 15;
    this.level = 5;
    this.numLives = 5;
    this.flag = true;
    
    this.init = function(view){
        this.myView = view;

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
        if(this.flag){
            requestAnimationFrame(this.field);

        }
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

    this.gameStartOnePlayer = () => {
        this.blocks = [];
        this.eagleState = 20;
        this.isMoving = false;
        this.isShoots = false;
        this.game = false;
        this.countTanks = 0;
        this.k = 1;
        this.enemiesPosY = 0;
        this.allEnemiesTanks = 0;
        this.enemies = [];
        this.dt = 0;
        this.score = 0;
    
        this.playerX = 9 * BLOCK_WIDTH;
        this.playerY = CANVAS_HEIGHT - TANK_SIZE;

        this.tank = new Tank();
        this.tank.init('player', this.myView, this, this.playerX, this.playerY, 4, 300);


        this.getElemsMap();
        requestAnimationFrame(this.clear);
        this.myView.drawRemainingTanks();

        setTimeout(() => {
            this.start();
            requestAnimationFrame(this.field);
        }, 5000);
    }

    this.drawEnemyTanks = () => {
        if(this.allEnemiesTanks < 20){
            if(this.countTanks < 4){
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

                this.enemies.push(new Tank());
                this.enemies[this.countTanks].init('enemy', this.myView, this, this.enemiesPosX, this.enemiesPosY, 3, 3000);
                this.enemies[this.countTanks].getParams();
                this.enemies[this.countTanks].loop();
                
                this.countTanks++;

                this.myView.deleteTankIcon();
            }
        }
    }

    this.nextLevel = function(){
        this.flag = true;
        this.soundMotor.play();
        this.soundMovement.play();
        this.level++;
        this.myView.changeNumStage(this.level);
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

        this.tank.init('player', this.myView, this, this.playerX, this.playerY, 4, 500);
    }

    this.tankKilled = function(i){
        this.dt++;
        this.enemies[i].delete();
        this.enemies.splice([i], 1);

        this.countTanks--;
        this.score += 200;
    }

    this.playerOneKeydown = function(){
        if(this.isMoving && !this.game){
            this.soundMovement.play();
            this.soundMotor.pause();
            this.tank.setSpeed();
            this.tank.checkCollision();
        } 
        else if(!this.isMoving && !this.game){
            this.soundMotor.play();
            this.soundMovement.pause();
        }

        this.tank.drawTank();
    }

    this.playerOneShiftKeydown = () => {
        if(this.isShoots){
            this.tank.setPosBullet();
        }
    }
    
    this.gameOver = () => {
        this.flag = false;
        this.eagleState = 21;
        this.soundMotor.pause();
        this.soundMovement.pause();
        this.game = true;
        this.level = 1;
        this.numLives = 5;

        for(let i = this.enemies.length - 1; i >= 0; i--){
            this.enemies[i].delete();
        }

        let user = {
            name: localStorage.getItem('PlayerName'),
            score: this.score
        };

        setTimeout(() => {
            this.soundGameOver.play();
            this.myView.gameOver();
        }, 1000);

        setTimeout(() => {
            this.myView.showScoring(this.level, this.score);
        }, 2000);

        setTimeout(() => {
            location.hash = '#main';
            this.statictic(user);
        }, 5000);
    }

    this.start = function(){
        requestAnimationFrame(this.loop);
    }

    this.clear = () => {
        this.myView.clearField();
        if(this.flag){
            requestAnimationFrame(this.clear);
        }
    }

    this.statictic = async function(user){
        try{
            await fetch('http://localhost:9090/users', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }catch(err){
            console.error(err);
        }
    }

    this.loop = () => {
        if(this.flag){
            requestAnimationFrame(this.loop);
        }
        this.myView.drawEagle(this.eagleState);
        this.tank.getParams(this.direction);
        this.playerOneKeydown();
        this.drawEnemyTanks();

        if(this.dt === 20 && this.level === 4){
            this.gameOver();
        } else if(this.dt === 20){
            this.flag = false;
            for(let i = this.enemies.length - 1; i >= 0; i--){
                this.enemies[i].delete();
            }    
            this.soundMotor.pause();
            this.soundMovement.pause();
            this.blocks = [];
            this.enemies = [];
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