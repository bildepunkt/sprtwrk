import CanvasRenderingContext2DMock from "../test/mocks/CanvasRenderingContext2DMock";

export default class Sprite {

  private alpha : number = 1;
  private blendMode: string = "source-over";
  private isVisible: boolean = true;
  private pivotX: number = 0;
  private pivotY: number = 0;
  private rotation: number = 0;
  private scaleX: number = 1;
  private scaleY: number = 1;
  private x: number = 0;
  private y: number = 0;
  private uid: number;

  private static uidCounter: number = 0;

  constructor (x: number = 0, y: number = 0, rotation: number = 0, scaleX: number = 1, scaleY: number = 1) {
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.scaleX = scaleX;
    this.scaleY = scaleY;

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
