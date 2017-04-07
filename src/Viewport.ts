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
              parent: HTMLElement | HTMLBodyElement = document.body,
              options: ViewportOptions = {}) {

    this.width = width;
    this.height = height;

    this.createCanvas("main", parent);

    for (let key in options) {
      if (options.hasOwnProperty(key)) {
        this[key] = options[key];
      }
    }
  }

  private createCanvas (id: string, parent: HTMLElement | HTMLBodyElement): void  {
    this.canvas = document.createElement("canvas");
    this.canvas.id = id;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.position = "absolute";
    this.canvas.style.left = "0";
    this.canvas.style.top = "0";

    parent.appendChild(this.canvas);

    this.context = this.canvas.getContext("2d");
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