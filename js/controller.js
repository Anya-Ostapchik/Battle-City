import { settings } from "./settings.js";

export function Controller() {
    let myModel = null;
    let myMenu = null;
    let myLevels = null;
    let playerOne = null;
    let playerTwo = null;
    let statistics = null;
    let rules = null;
    let soundMovement = null;
    let soundMotor = null;
    let soundShoot = null;
    // this.soundShoot = null;

    this.init = function(model, menu, levels){
        myModel = model;
        myMenu = menu;
        myLevels = levels

        this.bullet = false;
        myModel.level = levels[0];

        playerOne = menu.querySelector('#player_one');
        playerTwo = menu.querySelector('#player_two');
        statistics = menu.querySelector('#statistics');
        rules = menu.querySelector('#rules');
        
        playerOne.addEventListener('click', this.gameStartOnePlayer);
        playerTwo.addEventListener('click', this.gameStartTwoPlayer);
        statistics.addEventListener('click', this.showStatistics);
        rules.addEventListener('click', this.showRules);
        // window.onbeforeunload = () => false;

        soundMovement = new Audio('sound/sound-movement.ogg');
        soundMovement.loop = true;
        soundMotor = new Audio('sound/sound_motor.ogg');
        soundMotor.loop = true;
        soundShoot = new Audio('sound/sound_bullet_shot.ogg');
    }

    this.showStatistics = function(){
        myModel.showStatistics();
    }
    
    this.showRules = function(){
        myModel.showRules();
    }

    this.gameStartOnePlayer = () => {
        myModel.gameStartOnePlayer();


        addEventListener('keydown', function (e){
            switch (e.code) {
                case 'ArrowUp':
                    settings.isMoving = true;
                    settings.key = 'ArrowUp';
                    myModel.playerOneKeydown();
                    

                    soundMovement.play();
                    soundMotor.pause();
                    break;
                case 'ArrowDown':
                    settings.isMoving = true;
                    settings.key = 'ArrowDown';
                    myModel.playerOneKeydown();
                    

                    soundMovement.play();
                    soundMotor.pause();
                    break;
                case 'ArrowLeft':
                    settings.isMoving = true;
                    settings.key = 'ArrowLeft';
                    myModel.playerOneKeydown();
                    

                    soundMovement.play();
                    soundMotor.pause();
                    break;
                case 'ArrowRight':
                    settings.isMoving = true;
                    settings.key = 'ArrowRight';
                    myModel.playerOneKeydown();
                    

                    soundMovement.play();
                    soundMotor.pause();
                    break;
                case 'Space':
                    settings.isShoots = true;
                    // soundShoot.play();

                    myModel.playerOneShiftKeydown();
                    break;
                default:
                    break;
            }
        });

        addEventListener('keyup', function (e){
            switch (e.code) {
                case 'ArrowUp':
                    settings.isMoving = false;
                
                    soundMotor.play();
                    soundMovement.pause();
                    break;
                case 'ArrowDown':
                    settings.isMoving = false;

                    soundMotor.play();
                    soundMovement.pause();
                    break;
                case 'ArrowLeft':
                    settings.isMoving = false;

                    soundMotor.play();
                    soundMovement.pause();
                    break;
                case 'ArrowRight':
                    settings.isMoving = false;

                    soundMotor.play();
                    soundMovement.pause();
                    break;
                case 'Space':
                    settings.isShoots = false;
                    break;
                default:
                    break;
            } 
        });
        playerOne.removeEventListener('click', this.gameStartOnePlayer);
    }
}

