import AssetManager from "../src/AssetManager";
import { spy, useFakeTimers, SinonFakeTimers, SinonSpy } from "sinon";
import { expect } from "chai";

declare let global: any;

global.document = {
  createElement (type) {
    return {
      type,
      width: 0,
      height: 0,
      src: ""
    };
  }
};

describe("AssetManager", function () {
  let assetManager: AssetManager;

  beforeEach(function () {
    assetManager = new AssetManager();
    this.clock = useFakeTimers();
  });

  afterEach(function () {
    this.clock.restore();
  });

  it("loads assets from constructor", function () {
    const onComplete: SinonSpy = spy();

    new AssetManager({
      mp3: "./audio.mp3",
      png: "./1x1.png"
    }, onComplete);

    this.clock.tick(1000);
    expect(onComplete.called).to.be.true;
  });

  it("loads images", function () {
    var getTypeSpy: SinonSpy = spy(assetManager, "getType");
    
    assetManager.load({
      gif: "./1x1.gif",
      jpg: "./1x1.jpg",
      png: "./1x1.png"
    }, () => {
      const images: any = assetManager.getImages();

      expect(getTypeSpy.args[0][0]).to.equal("./1x1.gif");
      expect(getTypeSpy.args[1][0]).to.equal("./1x1.jpg");
      expect(getTypeSpy.args[2][0]).to.equal("./1x1.png");
      expect(images.gif).to.be.instanceof(Object);
      expect(images.jpg).to.be.instanceof(Object);
      expect(images.png).to.be.instanceof(Object);
    });
  });

  it("loads audio", function () {
    var getTypeSpy: SinonSpy = spy(assetManager, "getType");
    
    assetManager.load({
      mp3: "./audio.mp3",
      ogv: "./audio.ogv",
      wav: "./audio.wav"
    }, () => {
      const audio: any = assetManager.getAudio();

      expect(getTypeSpy.args[0][0]).to.equal("./audio.mp3");
      expect(getTypeSpy.args[1][0]).to.equal("./audio.ogv");
      expect(getTypeSpy.args[2][0]).to.equal("./audio.wav");
      expect(audio.mp3).to.be.instanceof(Object);
      expect(audio.ogv).to.be.instanceof(Object);
      expect(audio.wav).to.be.instanceof(Object);
    });
  });

  it("executes callback when all assets loaded", function () {
    var onComplete: SinonSpy = spy();

    assetManager.load({
      mp3: "./audio.mp3",
      png: "./1x1.png"
    }, onComplete);

    this.clock.tick(1000);
    expect(onComplete.called).to.be.true;
  });
});
