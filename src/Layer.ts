import Sprite from "./Sprite";

export default class Layer {

  private items: Sprite[] = [];

  constructor (...items: Sprite[]) {
    this.items = items;
  }

  public add (...items: Sprite[]) {
    this.items.push(...items);
  }

  private getIndex (item: Sprite): number {
    for (var index = 0, len = this.items.length; index < len; index++) {
      const element: Sprite = this.items[index];

      if (item.getUid() === element.getUid()) {
        return index;
      }
    }
  }

  public remove (...items): void {
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
