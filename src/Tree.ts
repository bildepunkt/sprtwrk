import Display from "./Display";
import Layer from "./Layer";

/**
 * @class Tree
 */
export default class Tree {
  /**
   * @private
   * @property {string} Tree#_bgColor
   */
  private _bgColor: string;  
  /**
   * @private
   * @property {Array<Layer>} Tree#layers
   */
  private _layers: Array<Layer>;

  /**
   * @constructor
   * @param {string} bgColor
   * @param {Array<Layer>} layers
   */
  constructor (bgColor: string, ...layers: Array<Layer>) {
    this.bgColor = bgColor;
    this._layers = layers;
  }

  /**
   * Applies the supplied function to each item in every layer
   * @method Tree#layerEach
   * @param {(item:Display, i:number, layer:Layer)=>boolean} fn - return false to short-circuit the entire loop
   * @param {object} [scope] - an object to bind the `fn` scope to
   */
  public layerEach (fn: (item: Display, i: number, layer: Layer) => boolean, scope: any) : void {
    let doContinue: boolean = true;

    for (let l: number = 0, layersLen: number = this._layers.length; l < layersLen; l++) {
      const layer: Layer = this._layers[l];

      if (doContinue === false) {
        break;
      }

      for (let i: number = 0, itemsLen: number = layer.items.length; i < itemsLen; i++) {
        const item: Display = layer[i];

        fn = scope ? fn.bind(scope) : fn;
        doContinue = fn(item, i, layer);

        if (doContinue === false) {
          break;
        }
      }
    }
  }

  public get layers (): Array<Layer> {
    return this._layers;
  }

  public get bgColor (): string {
    return this._bgColor;
  }

  public set bgColor (v: string) {
    this._bgColor = v;
  }
}
