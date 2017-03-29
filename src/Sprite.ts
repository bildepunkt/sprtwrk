import CanvasRenderingContext2DMock from "../test/mocks/CanvasRenderingContext2DMock";
import { assignArgs } from "./util";

/**
 * @TODO
 *  - add setMany(props: object)
 */
export default class Sprite {
  protected alpha : number = 1;
  protected blendMode: string = "source-over";
  protected isVisible: boolean = true;
  protected pivotX: number = 0;
  protected pivotY: number = 0;
  protected rotation: number = 0;
  protected scaleX: number = 1;
  protected scaleY: number = 1;
  protected x: number = 0;
  protected y: number = 0;
  protected uid: number = null;

  private static uidCounter: number = 0;

  constructor (args: object = {}) {
    assignArgs(this, args);

    this.uid = Sprite.uidCounter++;
  }

  public render (context: CanvasRenderingContext2D | CanvasRenderingContext2DMock): void {
    context.translate(this.x, this.y);
    context.rotate(this.rotation * Math.PI / 180);
    context.scale(this.scaleX, this.scaleY);
    context.translate(-this.pivotX, -this.pivotY);

    context.globalAlpha = this.alpha;
    context.globalCompositeOperation = this.blendMode;
  }

  public getAlpha(): number {
    return this.alpha;
  }
  public setAlpha (value: number): Sprite {
    this.alpha = value;
    return this;
  }

  public getBlendMode(): string {
    return this.blendMode;
  }
  public setBlendMode (val: string): Sprite {
    this.blendMode = val;
    return this;
  }

  public getIsVisible (): boolean {
    return this.isVisible;
  }
  public setIsVisible (val: boolean): Sprite {
    this.isVisible = val;
    return this;
  }

  public getPivotX (): number {
    return this.pivotX;
  }
  public setPivotX (val: number): Sprite {
    this.pivotX = val;
    return this;
  }

  public getPivotY (): number {
    return this.pivotY;
  }
  public setPivotY (val: number): Sprite {
    this.pivotY = val;
    return this;
  }

  public getRotation (): number {
    return this.rotation;
  }
  public setRotation (val: number): Sprite {
    this.rotation = val;
    return this;
  }

  public getScaleX (): number {
    return this.scaleX;
  }
  public setScaleX (val: number): Sprite {
    this.scaleX = val;
    return this;
  }

  public getScaleY (): number {
    return this.scaleY;
  }
  public setScaleY (val: number): Sprite {
    this.scaleY = val;
    return this;
  }

  public getX (): number {
    return this.x;
  }
  public setX (val: number): Sprite {
    this.x = val;
    return this;
  }

  public getY (): number {
    return this.y;
  }
  public setY (val: number): Sprite {
    this.y = val;
    return this;
  }

  public getUid (): number {
    return this.uid;
  }
}
