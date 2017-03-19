var RenderEngine = require("../build/RenderEngine").default;
var Tree = require("../build/Tree").default;
var Layer = require("../build/Layer").default;
var Display = require("../build/Display").default;
var CanvasMock = require("./mocks/CanvasElement");
var ContextMock = require("./mocks/Context2D");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;

chai.use(sinonChai);

describe("RenderEngine", function () {
  var canvas, context, bufferCanvas, bufferContext, renderEngine;

  beforeEach(function () {
    canvas = new CanvasMock();
    context = new ContextMock();
    bufferCanvas = new CanvasMock();
    bufferContext = new CanvasMock();

    canvas.width = 640;
    canvas.height = 480;
    bufferCanvas.width = 640;
    bufferCanvas.height = 480;

    renderEngine = new RenderEngine({
      canvas: canvas,
      context: context
    }, {
      canvas: bufferCanvas,
      context: bufferContext
    });
  });

  it("clears the canvas", function () {
    var clearRectSpy = sinon.spy(context, "clearRect");
    renderEngine.clear();

    expect(clearRectSpy.calledWith(0, 0, 640, 480)).to.be.ok;
  });

  it("fills the canvas if `clear` supplied with bg color", function () {
    var fillRectSpy = sinon.spy(context, "fillRect");
    renderEngine.clear("chartruse");

    expect(context.fillStyle).to.equal("chartruse");
    expect(fillRectSpy.calledWith(0, 0, 640, 480)).to.be.ok;
  });

  it("renders a non-cachable tree", function () {
    var display = new Display();
    var layer = new Layer(display);
    var tree = new Tree("deepblue", layer);

    var displayRenderSpy = sinon.spy(display, "render");
    var contextSaveSpy = sinon.spy(context, "save");
    var contextRestoreSpy = sinon.spy(context, "restore");

    renderEngine.render(tree);

    expect(displayRenderSpy.calledWith(context)).to.be.true;
    expect(contextSaveSpy.calledOnce).to.be.true;
    expect(contextRestoreSpy.calledOnce).to.be.true;
  });

  xit("renders a cachable tree", function () {

  });
});
