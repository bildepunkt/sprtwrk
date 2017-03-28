import * as util from "../src/util";
import { expect } from "chai";
import "mocha";

describe("util", () => {
  it("assigns args {assignArgs}", () => {
    const obj = { x: 0, y: 0 };

    util.assignArgs(obj, { x: 4, foo: "bar" });
    expect(obj.x).to.equal(4);
    expect(obj.y).to.equal(0);
    expect(obj.hasOwnProperty("foo")).to.be.false;
  });
});
