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
  /**
   * @property {number} width
   */
  private width: number;
  /**
   * @property {number} height
   */
  private height: number;
  /**
   * @property {HTMLCanvasElement} Viewport#viewCanvas
   */
  public viewCanvas: HTMLCanvasElement;
  /**
   * @property {CanvasRenderingContext2D} Viewport#viewContext
   */
  public viewContext: CanvasRenderingContext2D;
  /**
   * @property {HTMLCanvasElement} Viewport#bufferCanvas
   */
  public bufferCanvas: HTMLCanvasElement;
  /**
   * @property {CanvasRenderingContext2D} Viewport#bufferContext
   */
  public bufferContext: CanvasRenderingContext2D;
  /**
   * @property {boolean} imageSmoothingEnabled
   */

  /**
   * @constructor
   * @param {number} width - the width of the game viewport
   * @param {number} height - the height of the game viewport
   * @param {HTMLElement | HTMLDocument} parent - the parent DOM element to append the canvases to
   */
  constructor(width: number = 800,
              height: number = 600,
              parent: HTMLElement | HTMLBodyElement = document.body,
              options: ViewportOptions = {}) {

    this.width = width;
    this.height = height;

    this._createCanvas("view", parent);
    this._createCanvas("buffer", parent);

    for (let key in options) {
      this[key] = options[key];
    }
  }

  /**
   * @private
   * @method Viewport#_createCanvas
   * @param id 
   * @param parent 
   */
  private _createCanvas (id: string, parent: HTMLElement | HTMLBodyElement): void  {
    const canvas = document.createElement("canvas");
    canvas.id = id;
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.style.position = "absolute";
    canvas.style.left = "0";
    canvas.style.top = "0";

    parent.appendChild(canvas);

    this[id + "Context"] = canvas.getContext("2d");
    this[id + "Canvas"] = canvas;
  }

  /**
   * @private
   * @method Viewport#_setImageSmoothing
   * @param {CanvasRenderingContext2D} context
   * @param {boolean} val
   */
  private _setImageSmoothing (context: CanvasRenderingContext2D, val: boolean): void {
    context.imageSmoothingEnabled = val;
    context.mozImageSmoothingEnabled = val;
    context.oImageSmoothingEnabled = val;
    context.webkitImageSmoothingEnabled = val;
  }

  public set imageSmoothingEnabled (v : boolean) {
    this._setImageSmoothing(this.viewContext, v);
    this._setImageSmoothing(this.bufferContext, v);
  }

  public get imageSmoothingEnabled (): boolean {
    return this.viewContext.imageSmoothingEnabled;
  }
}
