/**
 * @class Tree
 */
export default class Tree {
  private items: Array<any>;

  /**
   * 
   * @param items 
   */
  constructor (...items: Array<any>) {
    this.items = items;
  }

  /**
   * 
   * @param item 
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
   * 
   * @param items 
   */
  public add (...items) {
    this.items.push(...items);
  }

  /**
   * 
   * @param items 
   */
  public remove (...items) {
    items.forEach(element => {
      const removeeIndex = this.getIndex(element);
      this.items.splice(removeeIndex, 1);
    });
  }
}
