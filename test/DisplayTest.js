var Display = require("../build/Display").default;
var expect = require("chai").expect;

describe("Base", function () {
  it("increments uids", function () {
    var b1 = new Display();
    var b2 = new Display();
    var b3 = new Display();

    expect(b1.uid).to.equal(0);
    expect(b2.uid).to.equal(1);
    expect(b3.uid).to.equal(2);
  });
});
