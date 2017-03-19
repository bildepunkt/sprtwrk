import Layer from "Layer";
import Tree from "./Tree";

/**
 * @interface Viewport
 * @property {HTMLCanvasElement} Viewport#canvas - the canvas HTMLCanvasElement
 * @property {CanvasRenderingContext2D} Viewport#context - the canvas render context
 */
interface Viewport {
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
};

/**
 * @class RenderEngine
 */
export default class RenderEngine {
  /**
   * @private
   * @property {Viewport} RenderEngine#_viewport - the display viewport
   */
  private _viewport: Viewport;
  /**
   * @private
   * @property {Viewport} RenderEngine#_bufferViewport - the buffer viewport
   */
  private _bufferViewport: Viewport;

  constructor(viewport: Viewport, bufferViewport: Viewport) {
    this._viewport = viewport;
    this._bufferViewport = bufferViewport;
  }

  /**
   * @method RenderEngine#clear
   * @param {string} bgColor
   */
  public clear(bgColor): void {
    const canvas: HTMLCanvasElement = this._viewport.canvas;
    const context: CanvasRenderingContext2D = this._viewport.context;

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
    const bufferCanvas: HTMLCanvasElement = this._bufferViewport.canvas;
    const bufferContext: CanvasRenderingContext2D = this._bufferViewport.context;

    bufferContext.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);

    for (const item of layer.items) {
      bufferContext.save();
      item.render(bufferContext);
      item.isDirty = false;
      bufferContext.restore();
    }

    return bufferContext.getImageData(0, 0, bufferCanvas.width, bufferCanvas.height);
  }

  /**
   * @method RenderEngine#render
   * @param {Tree} tree
   */
  public render (tree: Tree): void {
    const context: CanvasRenderingContext2D = this._viewport.context;

    this.clear(tree.bgColor);

    for (let layer of tree.layers) {
      if (layer.canCache) {
        if (!layer.imageData || layer.isDirty()) {
          layer.imageData = this.getImageDataFromLayer(layer);
        }

        context.putImageData(layer.imageData, 0, 0);
      } else {
        for (const item of layer.items) {
          context.save();
          item.render(context);
          item.isDirty = false;
          context.restore();
        }
      }
    }
  }
}
