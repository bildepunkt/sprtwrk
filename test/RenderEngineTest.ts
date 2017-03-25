import RenderEngine from "../src/RenderEngine";
import HTMLCanvasElementMock from "./mocks/HTMLCanvasElementMock";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import "mocha";

chai.use(sinonChai);

const expect = chai.expect;

describe("RenderEngine", () => {
  let canvas: HTMLCanvasElementMock, renderEngine: RenderEngine;

  beforeEach(function () {
    canvas = new HTMLCanvasElementMock("canvas");

    canvas.width = 640;
    canvas.height = 480;

    renderEngine = new RenderEngine(canvas);
  });

  it("instantiates with constructor params", () => {
    
  });
});
