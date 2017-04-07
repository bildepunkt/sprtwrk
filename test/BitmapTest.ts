import Bitmap from "../src/Bitmap";
import { expect } from "chai";
//import { spy } from "sinon";
import "mocha";

const document = {
  createElement (type) {
    return {
      type,
      width: 0,
      height: 0,
      src: ""
    };
  }
};

describe("Bitmap", () => {
  let image;

  beforeEach(() => {
    image = document.createElement("image");
    image.width = 640;
    image.height = 480;
    image.src = "img/foo.jpg";
  });

  it("sets dimensions & src dimensions", () => {
    const bitmap = new Bitmap({ image });

    expect(bitmap.getWidth()).to.equal(image.width);
    expect(bitmap.getHeight()).to.equal(image.height);
    expect(bitmap.getSrcWidth()).to.equal(image.width);
    expect(bitmap.getSrcHeight()).to.equal(image.height);
  });
});
