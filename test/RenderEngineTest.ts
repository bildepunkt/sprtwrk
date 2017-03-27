import RenderEngine from "../src/RenderEngine";
import Sprite from "../src/Sprite";
import Layer from "../src/Layer";
import Tree from "../src/Tree";
import HTMLCanvasElementMock from "./mocks/HTMLCanvasElementMock";
import CanvasRenderingContext2DMock from "./mocks/CanvasRenderingContext2DMock";
import { expect } from "chai";
import { spy } from "sinon";
import "mocha";

const noop = () => {
  // does not a thing
};
console.group = noop;
console.groupEnd = noop;
console.groupCollapsed = noop;

describe("RenderEngine", () => {
  let canvas: HTMLCanvasElementMock, context: CanvasRenderingContext2DMock, renderEngine: RenderEngine;

  beforeEach(function () {
    canvas = new HTMLCanvasElementMock("canvas");
    context = new CanvasRenderingContext2DMock(canvas);
    canvas.width = 640;
    canvas.height = 480;
    renderEngine = new RenderEngine(canvas, context, false);
  });

  it("renders a tree with 1 layer that contains 1 sprite", () => {
    const saveSpy = spy(context, "save");
    const restoreSpy = spy(context, "restore");
    const sprite = new Sprite();
    const spriteRenderSpy = spy(sprite, "render");
    const layer = new Layer(sprite);
    const tree = new Tree("#c0ffee", layer);

    renderEngine.render(tree);
    expect(spriteRenderSpy.calledWith(context)).to.be.true;
    expect(saveSpy.calledTwice).to.be.true;
    expect(restoreSpy.calledTwice).to.be.true;
  });

  it("clears the canvas", () => {
    const clearRectSpy = spy(context, "clearRect");
    renderEngine.clear();

    expect(clearRectSpy.calledWith(0, 0, 640, 480)).to.be.true;
  });

  it("fills the canvas if `clear` supplied with bg color", () => {
    const fillRectSpy = spy(context, "fillRect");
    renderEngine.clear("chartruse");

    expect(context.fillStyle).to.equal("chartruse");
    expect(fillRectSpy.calledWith(0, 0, 640, 480)).to.be.true;
  });
});
