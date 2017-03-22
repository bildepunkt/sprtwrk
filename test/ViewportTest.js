var Viewport = require("../build/Viewport").default;
var DomElement = require("./mocks/DomElement");
var Context2D = require("./mocks/Context2D");
var document = require("./mocks/Document");
var chai = require("chai");
var expect = chai.expect;

global.document = document;

describe("Viewport", function () {
  var DEFAULT_WIDTH = 800;
  var DEFAULT_HEIGHT = 600;

  it("instantiates with defaults", function () {
    var viewport = new Viewport();

    expect(viewport.width).to.equal(DEFAULT_WIDTH);
    expect(viewport.height).to.equal(DEFAULT_HEIGHT);

    expect(viewport.viewCanvas instanceof DomElement).to.be.true;
    expect(viewport.viewContext instanceof Context2D).to.be.true;
    expect(viewport.bufferCanvas instanceof DomElement).to.be.true;
    expect(viewport.bufferContext instanceof Context2D).to.be.true;

    expect(viewport.viewCanvas.width).to.equal(DEFAULT_WIDTH);
    expect(viewport.viewCanvas.height).to.equal(DEFAULT_HEIGHT);
    expect(viewport.bufferCanvas.width).to.equal(DEFAULT_WIDTH);
    expect(viewport.bufferCanvas.height).to.equal(DEFAULT_HEIGHT);

    expect(viewport.viewCanvas.style.left).to.equal("0");
    expect(viewport.viewCanvas.style.position).to.equal("absolute");
    expect(viewport.viewCanvas.style.top).to.equal("0");
    expect(viewport.bufferCanvas.style.left).to.equal("0");
    expect(viewport.bufferCanvas.style.position).to.equal("absolute");
    expect(viewport.bufferCanvas.style.top).to.equal("0");
  });
});
