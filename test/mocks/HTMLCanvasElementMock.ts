import HTMLElementMock from "./HTMLElementMock";
import CanvasRenderingContext2DMock from "./CanvasRenderingContext2DMock";

export default class HTMLCanvasElementMock extends HTMLElementMock {

  public width: number;
  public height: number;

  constructor(type: string) {
    super(type);
  }

  public getContext (contextType: string, contextAttributes?: Canvas2DContextAttributes): CanvasRenderingContext2DMock {
    switch (contextType) {
      case "2d":
        return new CanvasRenderingContext2DMock(this);
    }
  }
}
