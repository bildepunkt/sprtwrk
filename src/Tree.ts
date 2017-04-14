import Layer from "./Layer";

/**
 * @class Tree
 */
export default class Tree {
  private bgColor: string;
  private layers: Layer[] = [];

  constructor (bgColor: string, ...layers: Layer[]) {
    this.bgColor = bgColor;
    this.layers = layers;
  }

  public each (fn: Function, scope?: any): void {
    let doContinue = true;

    for (let i = 0, len = this.layers.length; i < len; i++) {
      const layer = this.layers[i];
      
      doContinue = layer.each(fn, scope);

      if (doContinue === false) {
        break;
      }
    }
  }

  public getBgColor (): string {
    return this.bgColor;
  }

  public getCount (): number {
    return this.layers.length;
  }

  public getAt (i: number): Layer {
    return this.layers[i];
  }

  public getLayers (): Layer[] {
    return this.layers;
  }
  
}
