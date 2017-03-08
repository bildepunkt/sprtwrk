var Foo = require("../build/pkg/Foo").default;
var expect = require("chai").expect;

describe("Foo", function () {
  it("has prop `bar`", function () {
    var bar = "asdflkj";
    var foo = new Foo(bar);
    expect(foo.bar).to.equal(bar);
  });
});
