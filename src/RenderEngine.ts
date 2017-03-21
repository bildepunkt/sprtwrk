import Layer from "./Layer";
import Tree from "./Tree";
import Viewport from "./Viewport";

/**
 * @class RenderEngine
 */
export default class RenderEngine {
  /**
   * @private
   * @property {HTMLCanvasElement} RenderEngine#_viewCanvas
   */
  private _viewCanvas: HTMLCanvasElement;
  /**
   * @private
   * @property {CanvasRenderingContext2D} RenderEngine#_viewContext
   */
  private _viewContext: CanvasRenderingContext2D;
  /**
   * @private
   * @property {HTMLCanvasElement} RenderEngine#_bufferCanvas
   */
  private _bufferCanvas: HTMLCanvasElement;
  /**
   * @private
   * @property {CanvasRenderingContext2D} RenderEngine#_bufferContext
   */
  private _bufferContext: CanvasRenderingContext2D;

  constructor(viewport: Viewport) {
    this._viewCanvas = viewport.viewCanvas;
    this._viewContext = viewport.viewContext;
    this._bufferCanvas = viewport.bufferCanvas;
    this._bufferContext = viewport.bufferContext;
  }

  /**
   * @method RenderEngine#clear
   * @param {string} bgColor
   */
  public clear(bgColor): void {
    const canvas: HTMLCanvasElement = this._viewCanvas;
    const context: CanvasRenderingContext2D = this._viewContext;

    if (bgColor) {
      context.fillStyle = bgColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  /**
   * @method RenderEngine#getImageDataFromLayer
   * @param {Layer} layer
   * @returns {ImageData} the layer's image data
   */
  public getImageDataFromLayer(layer: Layer): ImageData {
    const bufferCanvas: HTMLCanvasElement = this._bufferCanvas;
    const bufferContext: CanvasRenderingContext2D = this._bufferContext;

    bufferContext.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);

    for (const item of layer.items) {
      if (item.isVisible) {
        bufferContext.save();
        item.render(bufferContext);
        item.isDirty = false;
        bufferContext.restore();
      }
    }

    return bufferContext.getImageData(0, 0, bufferCanvas.width, bufferCanvas.height);
  }

  /**
   * @method RenderEngine#render
   * @param {Tree} tree
   */
  public render (tree: Tree): void {
    const context: CanvasRenderingContext2D = this._viewContext;

    this.clear(tree.bgColor);

    for (let layer of tree.layers) {
      if (layer.canCache) {
        if (!layer.imageData || layer.isDirty()) {
          layer.imageData = this.getImageDataFromLayer(layer);
        }

        context.putImageData(layer.imageData, 0, 0);
      } else {
        for (const item of layer.items) {
          if (item.isVisible) {
            context.save();
            item.render(context);
            item.isDirty = false;
            context.restore();
          }
        }
      }
    }
  }
}
