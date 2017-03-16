import Tree from "./Tree";

/**
 * @interface Viewport
 */
interface Viewport {
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
};

/**
 * @class RenderEngine
 */
export default class RenderEngine {
  private viewport: Viewport;
  private bufferViewport: Viewport;

  constructor(viewport: Viewport, bufferViewport: Viewport) {
    this.viewport = viewport;
    this.bufferViewport = bufferViewport;
  }

  /**
   * @method RenderEngine#clear
   * @param {string} bgColor
   */
  public clear(bgColor) : void {
    const canvas = this.viewport.canvas;
    const context = this.viewport.context;

    if (bgColor) {
      context.fillStyle = bgColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  /**
   * @method RenderEngine#render
   * @param {Tree} tree
   */
  public render (tree: Tree) : void {
    const context = this.viewport.context;

    this.clear(tree.bgColor);

    for (let layer of tree.layers) {
      if (layer.canCache) {
        if (layer.isDirty) {
          layer.imageData = this.getImageDataFromLayer(layer);
        }

        context.putImageData(layer.imageData, 0, 0);
      } else {
        for (const item of layer.items) {
          context.save();
          item.render(context);
          context.restore();
        }
      }
    }
  }

  /**
   * @method RenderEngine#getImageDataFromLayer
   * @param {Layer} layer
   * @returns {ImageData} the layer's image data
   */
  public getImageDataFromLayer(layer) : ImageData {
    const bufferCanvas = this.bufferViewport.canvas;
    const bufferContext = this.bufferViewport.context;

    bufferContext.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);

    for (const item of layer.items()) {
      bufferContext.save();
      item.render(bufferContext);
      bufferContext.restore();
    }

    return bufferContext.getImageData(0, 0, bufferCanvas.width, bufferCanvas.height);
  }
}
