import Bitmap from "../src/Bitmap";
import HTMLImageElementMock from "./mocks/HTMLImageElementMock";
import { expect } from "chai";
//import { spy } from "sinon";
import "mocha";

describe("Bitmap", () => {
  let image;

  beforeEach(() => {
    image = new HTMLImageElementMock("image");
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
