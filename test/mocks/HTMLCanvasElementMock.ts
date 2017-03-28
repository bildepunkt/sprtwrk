import HTMLElementMock from "./HTMLElementMock";
import CanvasRenderingContext2DMock from "./CanvasRenderingContext2DMock";

export default class HTMLCanvasElementMock extends HTMLElementMock {

  public width: number;
  public height: number;

  constructor(type: string) {
    super(type);
  }

  public getContext (contextId: "2d", contextAttributes?: Canvas2DContextAttributes): CanvasRenderingContext2D | CanvasRenderingContext2DMock {
    return new CanvasRenderingContext2DMock();
  }
}
