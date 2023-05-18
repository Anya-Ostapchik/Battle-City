export function Controller() {
    let myModel = null;
    let myContainer = null;

    this.init = function(model, container){
        this.bullet = false;
        myModel = model;
        myContainer = container;

        container.addEventListener('click', (e) => {
            if(e.target.getAttribute("href") === '#game'){
                this.gameStartOnePlayer();
            }
        });
    }

    this.gameStartOnePlayer = () => {
        setTimeout(() => {
            myModel.getCanvas();
            myModel.gameStartOnePlayer();
            myModel.drawEnemyTanks();
        }, 100);
        
        addEventListener('keydown', function (e){
            switch (e.code) {
                case 'ArrowUp':
                    myModel.isMoving = true;
                    myModel.key = 'ArrowUp';
                    break;
                case 'ArrowDown':
                    myModel.isMoving = true;
                    myModel.key = 'ArrowDown';
                    break;
                case 'ArrowLeft':
                    myModel.isMoving = true;
                    myModel.key = 'ArrowLeft';
                    break;
                case 'ArrowRight':
                    myModel.isMoving = true;
                    myModel.key = 'ArrowRight'; 
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
    }
}

