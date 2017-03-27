import Tree from "./Tree";
import Layer from "./Layer";
import Sprite from "./Sprite";
import { stringRepeat } from "./util";
import CanvasRenderingContext2DMock from "../test/mocks/CanvasRenderingContext2DMock";
import HTMLCanvasElementMock from "../test/mocks/HTMLCanvasElementMock";

export class RenderEngineDebugger {

  private doDebug: boolean;
  private layerCount: number = 0;

  constructor (doDebug: boolean) {
    this.doDebug = doDebug;
  }

  public render (tree): void {
    if (!this.doDebug) {
      return;
    }

    console.log("Tree");

    for (let l = 0, len = tree.getCount(); l < len; l++) {
      const layer = tree.getAt(l);
      const indentation = stringRepeat("  ", l + 1);

      console.log(`${indentation}Layer`);
      for (let i = 0, len = layer.getCount(); i < len; i++) {
        const sprite = layer.getAt(i);
        const indentation = stringRepeat("  ", (l + 1) + (i + 1));

        console.log(`${indentation}Sprite {${sprite.getUid()}} | `, sprite);
      }
    }
  }
}

export default class RenderEngine {
  
  private canvas: HTMLCanvasElement | HTMLCanvasElementMock;
  private context: CanvasRenderingContext2D | CanvasRenderingContext2DMock;
  private doDebug: boolean = true;
  private debugger: RenderEngineDebugger;

  constructor (canvas: HTMLCanvasElement | HTMLCanvasElementMock,
               context: CanvasRenderingContext2D | CanvasRenderingContext2DMock,
               doDebug: boolean = true) {
    this.canvas = canvas;
    this.context = context;
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
}
