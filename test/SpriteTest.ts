import Sprite from "../src/Sprite";
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
    expect(sprite.getPivotX()).to.equal(0);
    expect(sprite.getPivotY()).to.equal(0);
    expect(sprite.getRotation()).to.equal(0);
    expect(sprite.getScaleX()).to.equal(1);
    expect(sprite.getScaleY()).to.equal(1);
  });

  it("properly interacts with, and modifies, the render context", function () {
    var sprite = new Sprite();
    var context = new CanvasRenderingContext2D();

    sprite.setX(32);
    sprite.setY(32);
    sprite.setScaleX(2);
    sprite.setScaleY(1.4);
    sprite.setRotation(45);
    sprite.setPivotX(16);
    sprite.setPivotY(16);
    sprite.setAlpha(0.2);
    sprite.setBlendMode("multiply");

    var translateSpy = spy(context, "translate");
    var rotateSpy = spy(context, "rotate");
    var scaleSpy = spy(context, "scale");

    sprite.render(context);

    expect(translateSpy.calledTwice).to.be.true;
    expect(translateSpy.calledWith(sprite.getX(), sprite.getY())).to.be.true;
    expect(rotateSpy.calledWith(sprite.getRotation() * Math.PI / 180)).to.be.true;
    expect(scaleSpy.calledWith(sprite.getScaleX(), sprite.getScaleY())).to.be.true;
    expect(context.globalAlpha).to.equal(sprite.getAlpha());
    expect(context.globalCompositeOperation).to.equal(sprite.getBlendMode());
  });
});
