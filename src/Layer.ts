import Display from "./Display";

/**
 * @class Layer
 */
export default class Layer {
  /**
   * @private
   * @member {boolean} Layer#_canCache=false
   */
  private _canCache : boolean = false;
  /**
   * @private
   * @member {ImageData} Layer#_imageData
   */
  private _imageData : ImageData;
  /**
   * @private
   * @member {Array<Display>} Layer#_items=[]
   */
  private _items : Array<Display> = [];

  /**
   * @constructor
   * @param {Array<Display>} items - the items to instantiate with
   */
  constructor (...items : Array<Display>) {
    this._items = items;
  }

  /**
   * @method Layer#getIndex
   * @private
   * @param {Display} item
   */
  private _getIndex (item) : number {
    for (var index = 0, len = this._items.length; index < len; index++) {
      const element = this._items[index];

      if (item.uid === element.uid) {
        return index;
      }
    }
  }

  /**
   * @method Layer#add
   * @param {Array<Display>} items - the item(s) to add
   */
  public add (...items) : void {
    this._items.push(...items);
  }

  /**
   * @method Layer#getIsDirty
   * @returns {boolean} if layer is dirty
   */
  public isDirty () : boolean {
    let isDirty = false;

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
   * @param {Array<Display>} items - the item(s) to remove
   */
  public remove (...items) : void {
    items.forEach(element => {
      const removeeIndex = this._getIndex(element);
      this._items.splice(removeeIndex, 1);
    });
  }

  public get canCache () : boolean {
    return this._canCache;
  }

  public get imageData () : ImageData {
    return this._imageData;
  }

  public set imageData (v : ImageData) {
    this._imageData = v;
  }

  public get items () : Array<Display> {
    return this._items;
  }
}
