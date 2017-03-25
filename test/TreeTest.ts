import Tree from "../src/Tree";
import Layer from "../src/Layer";
import { expect } from "chai";
import "mocha";

describe("Tree", () => {
  it("instantiates with constructor params", () => {
    const tree = new Tree("#c0ffee", new Layer(), new Layer(), new Layer());

    expect(tree.getBgColor()).to.equal("#c0ffee");
    expect(tree.getCount()).to.equal(3);
  });
});
