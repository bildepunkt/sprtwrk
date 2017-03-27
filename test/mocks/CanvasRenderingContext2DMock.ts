import HTMLCanvasElementMock from "./HTMLCanvasElementMock";

export default class CanvasRenderingContext2DMock {

  public canvas: HTMLCanvasElementMock;
  public fillStyle: string = "#000000";
  public globalAlpha: number = 1;
  public globalCompositeOperation: string = "source-over";

  constructor (canvas?: HTMLCanvasElementMock) {
    this.canvas = canvas;
  }

  public clearRect (x: number, y: number, width: number, height: number) {
    //
  }

  public fillRect (x: number, y: number, width: number, height: number) {
    //
  }

  public restore () {
    //
  }

  public save () {
    //
  }

  public scale (x: number, y: number): void {
    //
  }

  public translate (x: number, y: number): void {
    //
  }

  public rotate (radians: number): void {
    //
  }
}
