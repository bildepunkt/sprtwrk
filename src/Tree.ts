import Layer from "./Layer";

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

  public getLayers (): Layer[] {
    return this.layers;
  }
}
