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
        soundMotor.volume = 0.2;
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
                    myModel.isMoving = true;
                    myModel.key = 'ArrowUp';                    

                    soundMovement.play();
                    soundMotor.pause();
                    break;
                case 'ArrowDown':
                    myModel.isMoving = true;
                    myModel.key = 'ArrowDown';                    

                    soundMovement.play();
                    soundMotor.pause();
                    break;
                case 'ArrowLeft':
                    myModel.isMoving = true;
                    myModel.key = 'ArrowLeft';                    

                    soundMovement.play();
                    soundMotor.pause();
                    break;
                case 'ArrowRight':
                    myModel.isMoving = true;
                    myModel.key = 'ArrowRight';                    

                    soundMovement.play();
                    soundMotor.pause();
                    break;
                case 'Space':
                    myModel.isShoots = true;

                    myModel.playerOneShiftKeydown();
                    break;
                default:
                    break;
            }
        });

        addEventListener('keyup', function (e){
            switch (e.code) {
                case 'ArrowUp':
                    myModel.isMoving = false;

                    soundMotor.play();
                    soundMovement.pause();
                    break;
                case 'ArrowDown':
                    myModel.isMoving = false;

                    soundMotor.play();
                    soundMovement.pause();
                    break;
                case 'ArrowLeft':
                    myModel.isMoving = false;

                    soundMotor.play();
                    soundMovement.pause();
                    break;
                case 'ArrowRight':
                    myModel.isMoving = false;

                    soundMotor.play();
                    soundMovement.pause();
                    break;
                case 'Space':
                    myModel.isShoots = false;
                    break;
                default:
                    break;
            } 
        });
        playerOne.removeEventListener('click', this.gameStartOnePlayer);
    }
}

