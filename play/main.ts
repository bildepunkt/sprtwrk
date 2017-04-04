import Sprite from "../src/Sprite";
import Layer from "../src/Layer";
import Tree from "../src/Tree";
import RenderEngine from "../src/RenderEngine";
import Viewport from "../src/Viewport";

const sprite1 = new Sprite();
const sprite2 = new Sprite();
const layer1 = new Layer([sprite1, sprite2]);
const layer2 = new Layer([sprite1, sprite2]);
const tree = new Tree("deepskyblue", layer1, layer2);
const viewport = new Viewport();
const renderEngine = new RenderEngine(viewport.getCanvas(), viewport.getContext());

renderEngine.render(tree);
