import { getObjectCount, xhrGet } from "./util";

/**
 * @class AssetManager
 */
export default class AssetManager {
  /**
   * @property {number} _loadedCount
   */
  private static _loadedCount: number;
  /**
   * @property {number} _totalCount
   */
  private static _totalCount: number;
  /**
   * @property {Function} _callback
   */
  private static _callback: Function;
  /**
   * @property {object} images
   */
  public images: object = {};
  /**
   * @property {object} audio
   */
  public audio: object = {};
  /**
   * @property {object} json
   */
  public json: object = {};
  
  /**
   * @constructor
   * @param {object} paths
   * @param {Function} callback
   */
  constructor (paths: object, callback: Function) {
    this.load(paths, callback);
  }

  /**
   * @private
   * @method AssetManager#onAssetLoad
   */
  private _onAssetLoad (): void {
    AssetManager._loadedCount++;

    if (AssetManager._loadedCount === AssetManager._totalCount) {
      if (AssetManager._callback) {
        AssetManager._callback();
      }
    }
  }

  /**
   * @method AssetManager#load
   * @param {object} paths
   * @param {Function} callback
   */
  public load (paths: any, callback: Function): void {
    AssetManager._loadedCount = 0;
    AssetManager._totalCount = getObjectCount(paths);
    AssetManager._callback = callback;

    for (let key in paths) {
      let asset;

      switch (this.getType(paths[key])) {
        case "audio":
          asset = new Audio();
          asset.oncanplaythrough(() => {
            this.audio[key] = asset;
            this._onAssetLoad();
          });
          break;
        case "image":
          asset = new Image();
          asset.onload(() => {
            this.images[key] = asset;
            this._onAssetLoad();
          });
          break;
        case "json":
          xhrGet(paths[key], (data) => {
            this.json[key] = asset;
            this._onAssetLoad();
          });
          break;
        default:
          throw new Error(`asset type for "${key}" not supported`);
      }
    }
  }

  /**
   * @method AssetManager#getType
   * @param {string} path
   * @returns {string}
   */
  public getType (path: string): string {
    if (path.indexOf(".mp3") > 0 || path.indexOf(".wav") > 0 || path.indexOf(".ogv") > 0) {
      return "audio";
    } else if (path.indexOf(".png") > 0 || path.indexOf(".jpg") > 0 || path.indexOf(".jpeg") > 0 || path.indexOf(".gif") > 0) {
      return "image";
    } else if (path.indexOf(".json") > 0) {
      return "json";
    }
  }
}
