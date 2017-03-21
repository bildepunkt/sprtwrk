import RenderEngine from "../../src/RenderEngine";
import Tree from "../../src/Tree";
import Layer from "../../src/Layer";
import Display from "../../src/Display";
import Viewport from "../../src/Viewport";

const viewport = new Viewport();
const player = new Display();
const layer = new Layer(player);
const tree = new Tree("#ccc", layer);
const renderEngine = new RenderEngine(viewport);

renderEngine.render(tree);
