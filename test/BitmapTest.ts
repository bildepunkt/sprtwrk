import Bitmap from "../src/Bitmap";
import document from "./mocks/document";
import { expect } from "chai";
//import { spy } from "sinon";
import "mocha";

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
