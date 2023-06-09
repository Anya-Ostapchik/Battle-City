export const spriteMap  = {
    //блоки
    1:[2 * 32, 5 * 32, 64, 64],//четвертинка кирпичного блока
    2:[0 * 32, 5 * 32, 64, 64], //четвертинка бетонного блока
    42:[0 * 32, 7 * 32, 64, 64],//трава
    43:[2 * 32, 7 * 32, 64, 64],//вода

    3:[4 * 32, 5 * 32, 32, 64],//правая кирпичная 1/8
    4:[5 * 32, 5 * 32, 64, 32],//верхняя кирпичная 1/8
    5:[8 * 32, 5 * 32, 64, 32],//нижняя кирпичная 1/8
    6:[7 * 32, 5 * 32, 32, 64],//левая кирпичная 1/8

    24:[2 * 32, 5 * 32, 32, 32], //нижняя левая кирпичная 1/16
    25:[3 * 32, 5 * 32, 32, 32], //нижняя правая кирпичная 1/16

    //танк игрока
    7:[0 * 32, 0, 32, 32], //up
    8:[1 * 32, 0, 32, 32], //right
    9:[2 * 32, 0, 32, 32], //down
    10:[3 * 32, 0, 31, 32], //left

    //пуля
    11:[0 * 32, 11 * 32, 6, 8], //up
    12:[1 * 32, 11 * 32, 8, 6], //right
    13:[2 * 32, 11 * 32, 6, 8], //down
    14:[3 * 32, 11 * 32, 8, 6], //left

    //взрыв от самого маленького к большому
    15:[0 * 32, 9 * 32, 32, 32],
    16:[1 * 32, 9 * 32, 32, 32],
    17:[2 * 32, 9 * 32, 32, 32],
    18:[3 * 32, 9 * 32, 64, 64],
    19:[5 * 32, 9 * 32, 64, 64],

    //орел
    20:[0 * 32, 3 * 32, 64, 64], //целый
    21:[2 * 32, 3 * 32, 64, 64], //поломанный

    //вражеский танк
    26:[0 * 32, 1 * 32, 32, 32], //up
    27:[1 * 32, 1 * 32, 32, 32], //right
    28:[2 * 32, 1 * 32, 32, 32], //down
    29:[3 * 32, 1 * 32, 31, 32], //left
}