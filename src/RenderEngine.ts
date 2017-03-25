import Tree from "./Tree";

export default class RenderEngine {
  
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor (canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
  }

  public clear(bgColor): void {
    const canvas: HTMLCanvasElement = this.canvas;
    const context: CanvasRenderingContext2D = this.context;

    if (bgColor) {
      context.fillStyle = bgColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  public render (tree: Tree): void {
    const context = this.context;

    this.clear(tree.getBgColor());
    this.context.save();

    for (const layer of tree.getLayers()) {
      for (const item of layer.getItems()) {
        if (item.getIsVisible()) {
          context.save();
          item.render(context);
          context.restore();
        }
      }
    }

    this.context.restore();
  }
}
