import RenderEngine from "../src/RenderEngine";
import Sprite from "../src/Sprite";
import Layer from "../src/Layer";
import Tree from "../src/Tree";
import HTMLCanvasElementMock from "./mocks/HTMLCanvasElementMock";
import { expect } from "chai";
import { spy } from "sinon";
import "mocha";

describe("RenderEngine", () => {
  let canvas: HTMLCanvasElementMock, renderEngine: RenderEngine, logData: string;
  const log = (msg: string): void => {
    logData += `${msg}\n`;
  };

  console.group = log;
  console.groupCollapsed = log;
  console.groupEnd = () => null;

  beforeEach(() => {
    logData = "";
    canvas = new HTMLCanvasElementMock("canvas");
    canvas.width = 640;
    canvas.height = 480;
    renderEngine = new RenderEngine(canvas, false);
  });

  it("renders a tree with 1 layer that contains 1 sprite", () => {
    const saveSpy = spy(renderEngine.getContext(), "save");
    const restoreSpy = spy(renderEngine.getContext(), "restore");
    const sprite = new Sprite();
    const spriteRenderSpy = spy(sprite, "render");
    const layer = new Layer(sprite);
    const tree = new Tree("#c0ffee", layer);

    renderEngine.render(tree);
    expect(spriteRenderSpy.calledWith(renderEngine.getContext())).to.be.true;
    expect(saveSpy.calledTwice).to.be.true;
    expect(restoreSpy.calledTwice).to.be.true;
  });

  it("clears the canvas", () => {
    const clearRectSpy = spy(renderEngine.getContext(), "clearRect");
    renderEngine.clear();

    expect(clearRectSpy.calledWith(0, 0, 640, 480)).to.be.true;
  });

  it("fills the canvas if `clear` supplied with bg color", () => {
    const fillRectSpy = spy(renderEngine.getContext(), "fillRect");
    renderEngine.clear("chartruse");

    expect(renderEngine.getContext().fillStyle).to.equal("chartruse");
    expect(fillRectSpy.calledWith(0, 0, 640, 480)).to.be.true;
  });

  xdescribe("debugger", () => {
    it("logs tree in console", () => {

    });
  });
});
