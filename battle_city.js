import { View } from "./js/view.js";
import { Model } from "./js/m.js";
import { Controller } from "./js/c.js";

const ModelGame = new Model();
const ViewGame = new View();
const ControllerGame = new Controller();

const content = document.querySelector('#content');

ModelGame.init(ViewGame);
ViewGame.init(content);
ControllerGame.init(ModelGame, content);
