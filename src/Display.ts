/**
 * @class Display
 */
export default class Display {
  /**
   * @private
   * @static
   * @member {number} Display#_uidCounter
   */
  private static _uidCounter : number = 0;
  /**
   * @private
   * @member {number} Display#_uid
   */
  private _uid : number;
  /**
   * @private
   * @member {boolean} Display#_isDirty=false
   */
  private _isDirty : boolean = false;
  /**
   * @private
   * @member {boolean} Display#_isVisible=true
   */
  private _isVisible : boolean = true;

  /**
   * @constructor
   */
  constructor () {
    this._uid = Display._uidCounter++;
  }

  public get uid () : number {
    return this._uid;
  }

  public get isDirty () : boolean {
    return this._isDirty;
  }

  public get isVisible () : boolean {
    return this._isVisible;
  }
}
