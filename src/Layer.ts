import Sprite from "./Sprite";

/**
 * @class Layer
 */
export default class Layer {
  private items: Sprite[];
  private listenForInput: boolean;

  constructor (items: Sprite[] = [], listenForInput: boolean = true) {
    this.items = items;
    this.listenForInput = listenForInput;
  }

  public add (...items: Sprite[]) {
    this.items.push(...items);
  }

  // public addAt (item: Sprite, index: number) {

  // }

  public each (fn: Function, scope?: any): boolean {
    let doContinue = true;

    fn = scope ? fn.bind(scope) : fn;

    for (let i = 0, len = this.items.length; i < len; i++) {
      const item = this.items[i];

      if (item instanceof Layer) {
        this.each(fn, scope);
      } else {
        doContinue = fn(item, i, this.items);
      }

      if (doContinue === false) {
        break;
      }
    }

    return doContinue;
  }

  private getIndex (item: Sprite): number {
    for (var index = 0, len = this.items.length; index < len; index++) {
      const element: Sprite = this.items[index];

      if (item.getUid() === element.getUid()) {
        return index;
      }
    }
  }

  public remove (...items: Sprite[]): void {
    items.forEach(item => {
      const removeeIndex: number = this.getIndex(item);
      this.items.splice(removeeIndex, 1);
    });
  }

  public getAt (index: number): Sprite {
    return this.items[index];
  }

  public getCount (): number {
    return this.items.length;
  }

  public getItems (): Sprite[] {
    return this.items;
  }
}
