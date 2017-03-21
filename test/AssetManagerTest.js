var AssetManager = require("../build/AssetManager").default;
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var createAsset = require("./helpers").createAsset;

global.Audio = createAsset("audio");
global.Image = createAsset("image");

describe("AssetManager", function () {
  var assetManager;

  beforeEach(function () {
    assetManager = new AssetManager();
  });

  it("loads assets from constructor", function () {
    var onComplete = sinon.spy();

    new AssetManager({
      mp3: "./audio.mp3",
      png: "./1x1.png"
    }, onComplete);

    expect(onComplete.called).to.be.true;
  });

  it("loads images", function () {
    var getTypeSpy = sinon.spy(assetManager, "getType");
    
    assetManager.load({
      gif: "./1x1.gif",
      jpg: "./1x1.jpg",
      png: "./1x1.png"
    });

    expect(getTypeSpy.args[0][0]).to.equal("./1x1.gif");
    expect(getTypeSpy.args[1][0]).to.equal("./1x1.jpg");
    expect(getTypeSpy.args[2][0]).to.equal("./1x1.png");
    expect(assetManager.images.gif).to.be.instanceof(Object);
    expect(assetManager.images.jpg).to.be.instanceof(Object);
    expect(assetManager.images.png).to.be.instanceof(Object);
  });

  it("loads audio", function () {
    var getTypeSpy = sinon.spy(assetManager, "getType");
    
    assetManager.load({
      mp3: "./audio.mp3",
      ogv: "./audio.ogv",
      wav: "./audio.wav"
    });

    expect(getTypeSpy.args[0][0]).to.equal("./audio.mp3");
    expect(getTypeSpy.args[1][0]).to.equal("./audio.ogv");
    expect(getTypeSpy.args[2][0]).to.equal("./audio.wav");
    expect(assetManager.audio.mp3).to.be.instanceof(Object);
    expect(assetManager.audio.ogv).to.be.instanceof(Object);
    expect(assetManager.audio.wav).to.be.instanceof(Object);
  });

  it("executes callback when all assets loaded", function () {
    var onComplete = sinon.spy();

    assetManager.load({
      mp3: "./audio.mp3",
      png: "./1x1.png"
    }, onComplete);

    expect(onComplete.called).to.be.true;
  });
});
