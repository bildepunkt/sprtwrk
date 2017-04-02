import HTMLElementMock from "../test/mocks/HTMLElementMock";
import HTMLCanvasElementMock from "../test/mocks/HTMLCanvasElementMock";

/**
 * @interface ViewportOptions
 */
interface ViewportOptions {
  imageSmoothingEnabled?: boolean;
}

/**
 * @class Viewport
 */
export default class Viewport {
  private width: number;
  private height: number;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(width: number = 800,
              height: number = 600,
              parent: HTMLElement | HTMLBodyElement | HTMLElementMock = document.body,
              options: ViewportOptions = {}) {

    this.width = width;
    this.height = height;

    this.createCanvas("view", parent);

    for (let key in options) {
      this[key] = options[key];
    }
  }

  private createCanvas (id: string, parent: HTMLElement | HTMLBodyElement | HTMLElementMock): void  {
    const canvas: HTMLCanvasElement | HTMLCanvasElementMock = document.createElement("canvas");
    canvas.id = id;
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.style.position = "absolute";
    canvas.style.left = "0";
    canvas.style.top = "0";

    parent.appendChild(canvas);

    this.context = canvas.getContext("2d");
  }

  private setImageSmoothing (context: CanvasRenderingContext2D, val: boolean): void {
    context.imageSmoothingEnabled = val;
    context.mozImageSmoothingEnabled = val;
    context.oImageSmoothingEnabled = val;
    context.webkitImageSmoothingEnabled = val;
  }

  public getWidth (): number {
    return this.width;
  }

  public getHeight (): number {
    return this.height;
  }

  public getCanvas (): HTMLCanvasElement {
    return this.canvas;
  }

  public getContext (): CanvasRenderingContext2D {
    return this.context;
  }
}