var Tree = require("../build/Tree").default;
var Display = require("../build/Display").default;
var expect = require("chai").expect;

describe("Tree", function () {
  it("instantiates with constructor layers", function () {
    var t = new Tree("red", {}, [{}], {});
    expect(t.layers.length).to.equal(3);
    expect(t.bgColor).to.equal("red");
  });
});
