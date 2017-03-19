var Layer = require("../build/Layer").default;
var Display = require("../build/Display").default;
var expect = require("chai").expect;

describe("Layer", function () {
  var layer;

  beforeEach(function () {
    layer = new Layer();
  });

  it("instantiates with constructor items", function () {
    var l = new Layer({}, [{}], {});
    expect(l.items.length).to.equal(3);
  });

  describe("Layer#add", function () {
    it("can add a single item", function () {
      expect(layer.items.length).to.equal(0);
      layer.add({});
      expect(layer.items.length).to.equal(1);
    });

    it("can add multiple items", function () {
      expect(layer.items.length).to.equal(0);
      layer.add({}, {}, [{}], {});
      expect(layer.items.length).to.equal(4);
    });
  });

  describe("Layer#remove", function () {
    it("can remove a single layer", function () {
      var removee = new Display();

      layer.add({}, removee, []);
      expect(layer.items.length).to.equal(3);

      layer.remove(removee);
      expect(layer.items.length).to.equal(2);
    });

    it("can remove multiple items", function () {
      var removeeA = new Display();
      var removeeB = new Display();
      var keepA = new Display();
      var keepB = new Display();

      layer.add(keepA, removeeA, keepB, removeeB);
      expect(layer.items.length).to.equal(4);

      layer.remove(removeeA, removeeB);
      expect(layer.items.length).to.equal(2);

      expect(layer.items[0].uid).to.equal(keepA.uid);
      expect(layer.items[1].uid).to.equal(keepB.uid);
    });
  });
});
