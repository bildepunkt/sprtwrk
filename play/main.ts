import Sprite from "../src/Sprite";
import Layer from "../src/Layer";
import Tree from "../src/Tree";
import RenderEngine from "../src/RenderEngine";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const sprite = new Sprite();
const layer = new Layer(sprite);
const tree = new Tree("deepskyblue", layer);
const renderEngine = new RenderEngine(canvas, context);

renderEngine.render(tree);
