import Sprite from "./Sprite";
import { assignArgs } from "./util";

export default class Bitmap extends Sprite {
  protected image: HTMLImageElement = null;
  protected srcX: number = 0;
  protected srcY: number = 0;
  protected srcWidth: number = null;
  protected srcHeight: number = null;
  protected width: number = null;
  protected height: number = null;
  protected tiling: string = "no-repeat";
  protected pattern: CanvasPattern = null;

  constructor (args: object = {}) {
    super(args);
    assignArgs(this, args);

    this.width = this.srcWidth || this.image.width;
    this.height = this.srcHeight || this.image.height;
    this.srcWidth = this.srcWidth || this.width;
    this.srcHeight = this.srcHeight || this.height;
  }

  render (context: CanvasRenderingContext2D): void {
    super.render(context);

    if (this.tiling !== "no-repeat") {
      this.pattern = context.createPattern(this.image, this.tiling);

      context.rect(
        0, 0,
        this.width  * this.scaleX,
        this.height * this.scaleY
      );
      context.fillStyle = this.pattern;
      context.fill();
    } else {
      context.drawImage(
        this.image,
        this.srcX,
        this.srcY,
        this.srcWidth,
        this.srcHeight,
        0, 0,
        this.width,
        this.height
      );
    }
  }

  public getImage (): HTMLImageElement {
    return this.image;
  }

  public getHeight (): number {
    return this.height;
  }

  public getSrcWidth (): number {
    return this.srcWidth;
  }

  public getSrcHeight (): number {
    return this.srcHeight;
  }

  public getWidth (): number {
    return this.width;
  }
}
