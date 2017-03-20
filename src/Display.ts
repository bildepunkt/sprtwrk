/**
 * @class Display
 */
export default class Display {
  /**
   * @private
   * @static
   * @property {number} Display#_uidCounter
   */
  private static _uidCounter: number = 0;
  /**
   * @readonly
   * @property {number} Display#uid
   */
  private _uid: number;
  /**
   * @property {boolean} Display#isDirty=false
   */
  private _isDirty: boolean = false;
  /**
   * @property {boolean} Display#isVisible=true
   */
  private _isVisible: boolean = true;
  /**
   * @property {number} Display#x = 0
   */
  private _x: number = 0;
  /**
   * @property {number} Display#y = 0
   */
  private _y: number = 0;
  /**
   * @property {number} Display#width = 64
   */
  private _width: number = 64;
  /**
   * @property {number} Display#height = 64
   */
  private _height: number = 64;
  /**
   * @property {number} Display#alpha = 1
   */
  private _alpha: number = 1;
  /**
   * @property {number} Display#rotation = 0
   */
  private _rotation: number = 0;
  /**
   * @property {number} Display#scaleX = 1
   */
  private _scaleX: number = 1;
  /**
   * @property {number} Display#scaleY = 1
   */
  private _scaleY: number = 1;
  /**
   * @property {number} Display#pivotX = 0
   */
  private _pivotX: number = 0;
  /**
   * @property {number} Display#pivotY = 0
   */
  private _pivotY: number = 0;
  /**
   * @property {number} Display#isDraggable = true
   */
  private _isDraggable: boolean = true;
  /**
   * @property {number} Display#compositeType = "source-over"
   */
  private _compositeType: string = "source-over";

  /**
   * @constructor
   */
  constructor () {
    this._uid = Display._uidCounter++;
  }

  /**
   * @method Display#render
   * @param {CanvasRenderingContext2D} context
   */
  public render (context: CanvasRenderingContext2D) {
    context.translate(Math.floor(this._x), Math.floor(this._y));
    context.rotate(this._rotation * Math.PI / 180);
    context.scale(this._scaleX, this._scaleY);
    context.translate(Math.floor(-this._pivotX), Math.floor(-this._pivotY));

    context.globalAlpha = this._alpha;
    context.globalCompositeOperation = this._compositeType;
  }

  public get uid (): number {
    return this._uid;
  }

  public get isDirty (): boolean {
    return this._isDirty;
  }
  public set isDirty (v: boolean) {
    this._isDirty = v;
  }

  public get isVisible (): boolean {
    return this._isVisible;
  }
  public set isVisible (v: boolean) {
    this._isDirty = true;
    this._isVisible = v;
  }

  public get x() : number {
    return this._x;
  }
  public set x(v : number) {
    this._isDirty = true;
    this._x = v;
  }
  
  public get y() : number {
    return this._y;
  }
  public set y(v : number) {
    this._isDirty = true;
    this._y = v;
  }
  
  /**
   * @readonly
   * @property {number} Display#globalX
   */
  get globalX (): number {
    return this._x - this._pivotX * this._scaleX;
  }

  /**
   * @readonly
   * @property {number} Display#globalY
   */
  get globalY (): number {
    return this._y - this._pivotY * this._scaleY;
  }
  
  public get width() : number {
    return this._width;
  }
  public set width(v : number) {
    this._isDirty = true;
    this._width = v;
  }
  
  public get height() : number {
    return this._height;
  }
  public set height(v : number) {
    this._isDirty = true;
    this._height = v;
  }
  
  public get alpha() : number {
    return this._alpha;
  }
  public set alpha(v : number) {
    this._isDirty = true;
    this._alpha = v;
  }
  
  public get rotation() : number {
    return this._rotation;
  }
  public set rotation(v : number) {
    this._isDirty = true;
    this._rotation = v;
  }
  
  public get scaleX() : number {
    return this._scaleX;
  }
  public set scaleX(v : number) {
    this._isDirty = true;
    this._scaleX = v;
  }
  
  public get scaleY() : number {
    return this._scaleY;
  }
  public set scaleY(v : number) {
    this._isDirty = true;
    this._scaleY = v;
  }
  
  public get pivotX() : number {
    return this._pivotX;
  }
  public set pivotX(v : number) {
    this._isDirty = true;
    this._pivotX = v;
  }
  
  public get pivotY() : number {
    return this._pivotY;
  }
  public set pivotY(v: number) {
    this._isDirty = true;
    this._pivotY = v;
  }

  public get isDraggable() : boolean {
    return this._isDraggable;
  }
  public set isDraggable(v : boolean) {
    this._isDirty = true;
    this._isDraggable = v;
  }
  
  public get compositeType() : string {
    return this._compositeType;
  }
  public set compositeType(v : string) {
    this._isDirty = true;
    this._compositeType = v;
  }
}
