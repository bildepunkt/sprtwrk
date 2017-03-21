import RenderEngine from "../../src/RenderEngine";
import Tree from "../../src/Tree";
import Layer from "../../src/Layer";
import Display from "../../src/Display";

const WIDTH = 800;
const HEIGHT = 600;

const viewport = new Viewport(WIDTH, HEIGHT);
const player = new Display();
const layer = new Layer(player);
const tree = new Tree("#ccc", layer);
const renderEngine = new RenderEngine(viewport);

renderEngine.render(tree);
