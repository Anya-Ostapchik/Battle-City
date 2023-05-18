import { View } from "./js/view.js";
import { Model } from "./js/model.js";
import { Controller } from "./js/controller.js";
// import { levels } from "./js/levels.js";

const ModelGame = new Model();
const ViewGame = new View();
const ControllerGame = new Controller();

// const menu = document.querySelector('#start');
// const canvas = document.querySelector('#canvas');
const content = document.querySelector('#content');

ModelGame.init(ViewGame);
ViewGame.init(content);
ControllerGame.init(ModelGame, content);