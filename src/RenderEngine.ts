import Tree from "./Tree";
import CanvasRenderingContext2DMock from "../test/mocks/CanvasRenderingContext2DMock";
import HTMLCanvasElementMock from "../test/mocks/HTMLCanvasElementMock";

export class RenderEngineDebugger {

  private doDebug: boolean;

  constructor (doDebug: boolean) {
    this.doDebug = doDebug;
  }

  public render (tree: Tree): void {
    if (!this.doDebug) {
      return;
    }

    console.group("Tree");
    for (const layer of tree.getLayers()) {
      console.group("Layer");
      for (const item of layer.getItems()) {
        console.groupCollapsed("Sprite");
        console.log(item);
        console.groupEnd();
      }
      console.groupEnd();
    }
    console.groupEnd();
  }
}

/**
 * @TODO
 */
export default class RenderEngine {
  
  private canvas: HTMLCanvasElement | HTMLCanvasElementMock;
  private context: CanvasRenderingContext2D | CanvasRenderingContext2DMock;
  private doDebug: boolean = true;
  private debugger: RenderEngineDebugger;

  constructor (canvas: HTMLCanvasElement | HTMLCanvasElementMock, doDebug: boolean = true) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.doDebug = doDebug;
    this.debugger = new RenderEngineDebugger(this.doDebug);
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

    this.debugger.render(tree);
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

  public getContext (): CanvasRenderingContext2D | CanvasRenderingContext2DMock {
    return this.context;
  }
}
