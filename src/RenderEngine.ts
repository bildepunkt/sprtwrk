import Tree from "./Tree";
import CanvasRenderingContext2DMock from "../test/mocks/CanvasRenderingContext2DMock";
import HTMLCanvasElementMock from "../test/mocks/HTMLCanvasElementMock";

export default class RenderEngine {
  
  private canvas: HTMLCanvasElement | HTMLCanvasElementMock;
  private context: CanvasRenderingContext2D | CanvasRenderingContext2DMock;

  constructor (canvas: HTMLCanvasElement | HTMLCanvasElementMock, context: CanvasRenderingContext2D | CanvasRenderingContext2DMock) {
    this.canvas = canvas;
    this.context = context;
  }

  public clear(bgColor?: string): void {
    const canvas: HTMLCanvasElement | HTMLCanvasElementMock = this.canvas;
    const context: CanvasRenderingContext2D | CanvasRenderingContext2DMock = this.context;

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
