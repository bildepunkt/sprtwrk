export default class Sprite {
  
  private alpha : number = 1;
  private blendMode: string = "source-over";
  private isVisible: boolean = true;
  private x: number = 0;
  private y: number = 0;
  private uid: number;

  private static uidCounter: number = 0;

  constructor (x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
    this.uid = Sprite.uidCounter++;
  }

  public render (context: CanvasRenderingContext2D): void {
    //
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
