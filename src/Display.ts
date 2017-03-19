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
   * @constructor
   */
  constructor () {
    this._uid = Display._uidCounter++;
  }

  /**
   * @method Display#render
   */
  public render (context: CanvasRenderingContext2D) {
    //
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
    this._isVisible = v;
  }
}
