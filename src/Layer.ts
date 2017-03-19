import Display from "./Display";

/**
 * @class Layer
 */
export default class Layer {
  /**
   * @property {boolean} Layer#canCache=false - if true, the layer's image data is cached and rendered if no display items are dirty
   */
  private _canCache: boolean = false;
  /**
   * @property {ImageData} Layer#imageData - the object from CanvasRenderingContext2D#getImageData (if `_canCache` is true, and no Display items are dirty)
   */
  private _imageData: ImageData;
  /**
   * @readonly
   * @property {Array<Display>} Layer#items=[] - the Display entities
   */
  private _items: Array<Display> = [];
  /**
   * @property {Array<Display>} Layer#receivesInput=true - if true, checks user input against Display items
   */
  private _receivesInput: boolean = true;

  /**
   * @constructor
   * @param {Array<Display>} items - the items to instantiate with
   */
  constructor (...items: Array<Display>) {
    this._items = items;
  }

  /**
   * @private
   * @method Layer#getIndex
   * @param {Display} item - the Display item
   */
  private _getIndex (item): number {
    for (var index = 0, len = this._items.length; index < len; index++) {
      const element: Display = this._items[index];

      if (item.uid === element.uid) {
        return index;
      }
    }
  }

  /**
   * @method Layer#add
   * @param {Array<Display>} items - the Display item(s) to add
   */
  public add (...items): void {
    this._items.push(...items);
  }

  /**
   * @method Layer#isDirty
   * @returns {boolean} - if layer is dirty
   */
  public isDirty (): boolean {
    let isDirty: boolean = false;

    for (const item of this.items) {
      if (item.isDirty) {
        isDirty = true;
        break;
      }
    }

    return isDirty;
  }

  /**
   * @method Layer#remove
   * @param {Array<Display>} items - the Display item(s) to remove
   */
  public remove (...items): void {
    items.forEach(element => {
      const removeeIndex: number = this._getIndex(element);
      this._items.splice(removeeIndex, 1);
    });
  }

  public get canCache (): boolean {
    return this._canCache;
  }

  public set canCache (v: boolean) {
    this._canCache = v;
  }

  public get imageData (): ImageData {
    return this._imageData;
  }

  public set imageData (v: ImageData) {
    this._imageData = v;
  }

  public get items (): Array<Display> {
    return this._items;
  }

  public get receivesInput (): boolean {
    return this._receivesInput;
  }

  public set receivesInput (v: boolean) {
    this._receivesInput = v;
  }

}
