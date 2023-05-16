export const BLOCK_WIDTH = 32;
export const BLOCK_HEIGHT = 24;
export const BULLET_SIZE = 10;
export const EXPLOSION_SIZE = 32;
export const CANVAS_WIDTH = 832;
export const CANVAS_HEIGHT = 624;

// export const BLOCK_SIZE = 24;
export let settings = {
    level: 1, //уровень
    windowHeight: document.documentElement.clientHeight,
    // canvasWidth: 832,
    // canvasHeight: 624,
    // sumPointsFirstPlayer: 15000, //сумма всех очков за игру первого игрока
    // sumPointsSecondPlayer: 5000, //сумма всех очков за игру второго игрока
    // tanksCount: 20, //количество танков, которые появятся на поле
    playerTwo: false,
    playerOneSpeedX: 0,
    playerOneSpeedY: 0,
    playerOnePosX: 6*48,
    playerOnePosY: 624-48,
    playerOneSpeedBulletX: 0,
    playerOneSpeedBulletY: 0,
    playerOnePosBulletX: 0,
    playerOnePosBulletY: 0,
    tankSize: 48,
    // blockWidth: 64,
    // blockHeight: 48,
    isMoving: false,
    isShoots: false,
    key: 'ArrowUp',
    measurementError: 4, //погрешность в расчетах со столкновениями о блоки
    // countEnemy: 4,
}