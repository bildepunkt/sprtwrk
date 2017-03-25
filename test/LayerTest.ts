import Layer from "../src/Layer";
import Sprite from "../src/Sprite";
import { expect } from "chai";
import "mocha";

describe("Layer", () => {
  it("instantiates with constructor params", () => {
    const layer = new Layer(new Sprite(), new Sprite(), new Sprite());

    expect(layer.getItems().length).to.equal(3);
  });

  it("can have item(s) added to it", () => {
    const layer = new Layer();

    layer.add(new Sprite());
    expect(layer.getCount()).to.equal(1);
    layer.add(new Sprite(), new Sprite());
    expect(layer.getCount()).to.equal(3);
  });

  it("returns an item's index", () => {
    const s1 = new Sprite();
    const s2 = new Sprite();
    const s3 = new Sprite();
    const layer = new Layer(s1, s2, s3);

    expect(layer.getAt(0).getUid()).to.equal(s1.getUid());
    expect(layer.getAt(1).getUid()).to.equal(s2.getUid());
    expect(layer.getAt(2).getUid()).to.equal(s3.getUid());
  });

  it("can have item(s) removed from it", () => {
    const s1 = new Sprite();
    const s2 = new Sprite();
    const s3 = new Sprite();
    const s4 = new Sprite();
    const layer = new Layer(s1, s2, s3, s4);

    layer.remove(s2);
    expect(layer.getCount()).to.equal(3);
    expect(layer.getAt(0).getUid()).to.equal(s1.getUid());
    expect(layer.getAt(1).getUid()).to.equal(s3.getUid());
    expect(layer.getAt(2).getUid()).to.equal(s4.getUid());
    layer.remove(s1, s4);
    expect(layer.getCount()).to.equal(1);
    expect(layer.getAt(0).getUid()).to.equal(s3.getUid());
  });
});
