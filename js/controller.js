export function Controller() {
    let myModel = null;
    let myContainer = null;

    this.init = function(model, container){
        this.bullet = false;
        myModel = model;
        myContainer = container;

        myContainer.addEventListener('click', (e) => {
            if(e.target.getAttribute("href") === '#game'){
                this.gameStartOnePlayer();
            }
        });
    }

    this.gameStartOnePlayer = () => {
        setTimeout(() => {
            myModel.getCanvas();
            myModel.gameStartOnePlayer();
        }, 100);
        
        addEventListener('keydown', function (e){
            switch (e.code) {
                case 'ArrowUp':
                    myModel.isMoving = true;
                    myModel.direction = 7;
                    break;
                case 'ArrowDown':
                    myModel.isMoving = true;
                    myModel.direction = 9;
                    break;
                case 'ArrowLeft':
                    myModel.isMoving = true;
                    myModel.direction = 10;
                    break;
                case 'ArrowRight':
                    myModel.isMoving = true;
                    myModel.direction = 8;
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
                    break;
                case 'ArrowDown':
                    myModel.isMoving = false;
                    break;
                case 'ArrowLeft':
                    myModel.isMoving = false;
                    break;
                case 'ArrowRight':
                    myModel.isMoving = false;
                    break;
                case 'Space':
                    myModel.isShoots = false;
                    break;
                default:
                    break;
            } 
        });

        myContainer.addEventListener('touchstart', function (e){
            switch (e.target.getAttribute("id")) {
                case 'canvas__arrow-up':
                    myModel.isMoving = true;
                    myModel.direction = 7;
                    break;
                case 'canvas__arrow-left':
                    myModel.isMoving = true;
                    myModel.direction = 10;
                    break;
                case 'canvas__arrow-down':
                    myModel.isMoving = true;
                    myModel.direction = 9;
                    break;
                case 'canvas__arrow-right':
                    myModel.isMoving = true;
                    myModel.direction = 8;
                    break;
                case 'canvas__shoot':
                    myModel.isShoots = true;
                    myModel.playerOneShiftKeydown();
                    break;
            
                default:
                    break;
            }
        });

        myContainer.addEventListener('touchend', function (e){
            switch (e.target.getAttribute("id")) {
                case 'canvas__arrow-up':
                    myModel.isMoving = false;
                    break;
                case 'canvas__arrow-left':
                    myModel.isMoving = false;
                    break;
                case 'canvas__arrow-down':
                    myModel.isMoving = false;
                    break;
                case 'canvas__arrow-right':
                    myModel.isMoving = false;
                    break;
                case 'canvas__shoot':
                    myModel.isShoots = true;
                    myModel.playerOneShiftKeydown();
                    break;
                default:
                    break;
            }
        });
    }
}
