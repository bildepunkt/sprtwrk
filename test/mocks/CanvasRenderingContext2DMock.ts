import HTMLCanvasElementMock from "./HTMLCanvasElementMock";

export default class CanvasRenderingContext2DMock {
  public canvas: HTMLCanvasElementMock;
  public fillStyle: string = "#000000";

  constructor (canvas: HTMLCanvasElementMock) {
    this.canvas = canvas;
  }

  public fillRect (x: number, y: number, width: number, height: number) {
    //
  }
}