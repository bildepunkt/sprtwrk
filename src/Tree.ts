/**
 * @class Tree
 */
export default class Tree {
  /**
   * @private
   * @member {Array} items
   */
  private items: Array<any>;

  /**
   * @constructor
   * @param {Array<any>} items
   */
  constructor (...items: Array<any>) {
    this.items = items;
  }

  /**
   * @private
   * @param {Display} item
   */
  private getIndex (item): number {
    for (var index = 0, len = this.items.length; index < len; index++) {
      const element = this.items[index];

      if (Array.isArray(element)) {
        this.getIndex(element);
      } else {
        if (item.uid === element.uid) {
          return index;
        }
      }
    }
  }

  /**
   * @param {Array<any>} items
   */
  public add (...items) {
    this.items.push(...items);
  }

  /**
   * @param {Array<any>} items
   */
  public remove (...items) {
    items.forEach(element => {
      const removeeIndex = this.getIndex(element);
      this.items.splice(removeeIndex, 1);
    });
  }
}
