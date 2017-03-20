var Display = require("../build/Display").default;
var Context = require("./mocks/Context2D");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;

describe("Display", function () {
  it("increments uids", function () {
    var b1 = new Display();
    var b2 = new Display();
    var b3 = new Display();

    expect(b1.uid).to.equal(0);
    expect(b2.uid).to.equal(1);
    expect(b3.uid).to.equal(2);
  });

  it("gets dirty when modified", function () {
    var d = new Display();
    expect(d.isDirty).to.be.false;
    d.x = 64;
    expect(d.isDirty).to.be.true;
  });

  it("properly interacts with, and modifies, the render context", function () {
    var d = new Display();
    var c = new Context();

    d.x = 32;
    d.y = 32;
    d.scaleX = 2;
    d.scaleY = 1.4;
    d.rotation = 45;
    d.pivotX = 16;
    d.pivotY = 16;
    d.alpha = 0.2;
    d.compositeType = "multiply";

    var translateSpy = sinon.spy(c, "translate");
    var rotateSpy = sinon.spy(c, "rotate");
    var scaleSpy = sinon.spy(c, "scale");

    d.render(c);

    expect(translateSpy.calledTwice).to.be.true;
    expect(translateSpy.calledWith(d.x, d.y)).to.be.true;
    expect(rotateSpy.calledWith(d.rotation * Math.PI / 180)).to.be.true;
    expect(scaleSpy.calledWith(d.scaleX, d.scaleY)).to.be.true;
    expect(c.globalAlpha).to.equal(d.alpha);
    expect(c.globalCompositeOperation).to.equal(d.compositeType);
  });
});
