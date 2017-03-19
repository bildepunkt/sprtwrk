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
    bufferContext = new ContextMock();

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

  describe("render cachable layer", function () {
    var display, layer, tree, renderEngineGetImageDataFromLayerSpy, contextPutImageDataSpy;

    beforeEach(function () {
      display = new Display();
      layer = new Layer(display);
      tree = new Tree("deepblue", layer);
      renderEngineGetImageDataFromLayerSpy = sinon.spy(renderEngine, "getImageDataFromLayer");
      contextPutImageDataSpy = sinon.spy(context, "putImageData");
    });

    it("renders a cachable tree > layer that has no imageData and is not dirty", function () {
      layer.canCache = true;
      renderEngine.render(tree);

      expect(renderEngineGetImageDataFromLayerSpy.calledWith(layer)).to.be.true;
      expect(contextPutImageDataSpy.calledWith(layer.imageData, 0, 0)).to.be.true;
    });

    it("renders a cachable tree > layer that has imageData and is dirty", function () {
      layer.canCache = true;
      layer.imageData = {};
      // TODO - revisit messing with this private member
      display._isDirty = true;
      renderEngine.render(tree);

      expect(renderEngineGetImageDataFromLayerSpy.calledWith(layer)).to.be.true;
      expect(contextPutImageDataSpy.calledWith(layer.imageData, 0, 0)).to.be.true;
    });

    it("renders a cachable tree > layer that has imageData and is not dirty", function () {
      var specificImageData = { data: [], width: 123, height: 321 };

      layer.canCache = true;
      layer.imageData = specificImageData;
      renderEngine.render(tree);

      expect(renderEngineGetImageDataFromLayerSpy.called).to.be.false;
      expect(contextPutImageDataSpy.calledWith(specificImageData, 0, 0)).to.be.true;
    });
  });
});
