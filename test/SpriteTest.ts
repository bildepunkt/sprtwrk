import Sprite from "../src/Sprite";
import { expect } from "chai";
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
});
