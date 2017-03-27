import Sprite from "../src/Sprite";
import CanvasRenderingContext2DMock from "./mocks/CanvasRenderingContext2DMock";
import { expect } from "chai";
import { spy } from "sinon";
import "mocha";

describe("Sprite", () => {
  it("increments uid count", () => {
    const s1 = new Sprite();
    const s2 = new Sprite();
    const s3 = new Sprite();

    expect(s2.getUid() - s1.getUid()).to.equal(1);
    expect(s3.getUid() - s2.getUid()).to.equal(1);
  });

  it("instantiates with defaults", () => {
    const sprite = new Sprite();

    expect(sprite.getAlpha()).to.equal(1);
    expect(sprite.getBlendMode()).to.equal("source-over");
    expect(sprite.getIsVisible()).to.equal(true);
    expect(sprite.getX()).to.equal(0);
    expect(sprite.getY()).to.equal(0);
  });

  it("properly interacts with, and modifies, the render context", function () {
    var s = new Sprite();
    var c = new CanvasRenderingContext2DMock();

    s.setX(32);
    s.setY(32);
    s.setScaleX(2);
    s.setScaleY(1.4);
    s.setRotation(45);
    s.setPivotX(16);
    s.setPivotY(16);
    s.setAlpha(0.2);
    s.setBlendMode("multiply");

    var translateSpy = spy(c, "translate");
    var rotateSpy = spy(c, "rotate");
    var scaleSpy = spy(c, "scale");

    s.render(c);

    expect(translateSpy.calledTwice).to.be.true;
    expect(translateSpy.calledWith(s.getX(), s.getY())).to.be.true;
    expect(rotateSpy.calledWith(s.getRotation() * Math.PI / 180)).to.be.true;
    expect(scaleSpy.calledWith(s.getScaleX(), s.getScaleY())).to.be.true;
    expect(c.globalAlpha).to.equal(s.getAlpha());
    expect(c.globalCompositeOperation).to.equal(s.getBlendMode());
  });
});
