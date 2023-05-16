import { View } from "./js/view.js";
import { Model } from "./js/model.js";
import { Controller } from "./js/controller.js";
import { levels } from "./js/levels.js";

const ModelGame = new Model();
const ViewGame = new View();
const ControllerGame = new Controller();

const menu = document.querySelector('#start');
const canvas = document.querySelector('#canvas');

ModelGame.init(ViewGame, levels);
ViewGame.init(menu, canvas);
ControllerGame.init(ModelGame, menu, levels);