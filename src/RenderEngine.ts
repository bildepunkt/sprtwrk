import Tree from "./Tree";

/**
 * @class RenderEngineDebugger
 */
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
 * @class RenderEngine
 */
export default class RenderEngine {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private debugger: RenderEngineDebugger;

  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, doDebug: boolean = true) {
    this.canvas = canvas;
    this.context = context;
    this.debugger = new RenderEngineDebugger(doDebug);
  }

  public clear(bgColor?: string): void {
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
    const context: CanvasRenderingContext2D = this.context;

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

  public getContext (): CanvasRenderingContext2D {
    return this.context;
  }
}
