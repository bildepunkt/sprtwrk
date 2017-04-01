import Sprite from "../src/Sprite";
import Layer from "../src/Layer";
import Tree from "../src/Tree";
import RenderEngine from "../src/RenderEngine";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const sprite1 = new Sprite();
const sprite2 = new Sprite();
const layer1 = new Layer(sprite1, sprite2);
const layer2 = new Layer(sprite1, sprite2);
const tree = new Tree("deepskyblue", layer1, layer2);
const renderEngine = new RenderEngine(canvas);

renderEngine.render(tree);
