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
