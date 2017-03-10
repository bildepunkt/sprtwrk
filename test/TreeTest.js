var Tree = require("../build/Tree").default;
var Display = require("../build/Display").default;
var expect = require("chai").expect;

describe("Tree", function () {
  var tree;

  beforeEach(function () {
    tree = new Tree();
  });

  it("instantiates with constructor items", function () {
    var t = new Tree({}, [{}], {});
    expect(t.items.length).to.equal(3);
  });

  describe("Tree#add", function () {
    it("can add a single item", function () {
      expect(tree.items.length).to.equal(0);
      tree.add({});
      expect(tree.items.length).to.equal(1);
    });

    it("can add multiple items", function () {
      expect(tree.items.length).to.equal(0);
      tree.add({}, {}, [{}], {});
      expect(tree.items.length).to.equal(4);
    });
  });

  describe("Tree#remove", function () {
    it("can remove a single item", function () {
      var removee = new Display();

      tree.add({}, removee, []);
      expect(tree.items.length).to.equal(3);

      tree.remove(removee);
      expect(tree.items.length).to.equal(2);
    });

    it("can remove multiple items", function () {
      var removeeA = new Display();
      var removeeB = new Display();

      tree.add({}, removeeA, [{}], removeeB);
      expect(tree.items.length).to.equal(4);

      tree.remove(removeeA, removeeB);
      expect(tree.items.length).to.equal(2);
    });
  });
});
