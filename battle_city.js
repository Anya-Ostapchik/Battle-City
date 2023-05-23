import { View } from "./js/view.js";
import { Model } from "./js/model.js";
import { Controller } from "./js/controller.js";

const ModelGame = new Model();
const ViewGame = new View();
const ControllerGame = new Controller();

const content = document.querySelector('#content');

ModelGame.init(ViewGame);
ViewGame.init(content);
ControllerGame.init(ModelGame, content);