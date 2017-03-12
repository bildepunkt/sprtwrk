import Layer from "./Layer";

/**
 * @class Tree
 */
export default class Tree {
  /**
   * @private
   * @property {string} Tree#_bgColor
   */
  private _bgColor : string;  
  /**
   * @private
   * @member {Array<Layer>} Tree#layers
   */
  private _layers : Array<Layer>;

  /**
   * @constructor
   * @param {string} bgColor
   * @param {Array<Layer>} layers
   */
  constructor (bgColor : string, ...layers : Array<Layer>) {
    this.bgColor = bgColor;
    this._layers = layers;
  }

  public get layers () : Array<Layer> {
    return this._layers;
  }

  public get bgColor () : string {
    return this._bgColor;
  }

  public set bgColor (v : string) {
    this._bgColor = v;
  }
}
