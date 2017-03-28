import HTMLCanvasElementMock from "./HTMLCanvasElementMock";
import CanvasPatternMock from "./CanvasPatternMock";

export default class CanvasRenderingContext2DMock {

  public canvas: HTMLCanvasElementMock;
  public fillStyle: string | CanvasPattern | CanvasPatternMock = "#000000";
  public globalAlpha: number = 1;
  public globalCompositeOperation: string = "source-over";

  constructor (canvas?: HTMLCanvasElementMock) {
    this.canvas = canvas;
  }

  public clearRect (x: number, y: number, width: number, height: number): void {
    //
  }

  public createPattern (image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
                        tiling: string): CanvasPatternMock {
    return new CanvasPatternMock();
  }

  public drawImage (image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, ...args: number[]) {
    //
  }

  public fill (): void {
    //
  }

  public fillRect (x: number, y: number, width: number, height: number): void {
    //
  }

  public rect (x: number, y: number, width: number, height: number): void {
    //
  }

  public restore (): void {
    //
  }

  public save (): void {
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
