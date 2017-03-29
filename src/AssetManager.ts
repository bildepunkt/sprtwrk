import { getObjectCount, xhrGet } from "./util";

export default class AssetManager {
  private static loadedCount: number;
  private static totalCount: number;
  private static callback: Function;
  private images: object = {};
  private audio: object = {};
  private json: object = {};

  constructor (paths?: object, callback?: Function) {
    if (paths && callback) {
      this.load(paths, callback);
    }
  }

  private onAssetLoad (): void {
    AssetManager.loadedCount++;

    if (AssetManager.loadedCount === AssetManager.totalCount) {
      if (AssetManager.callback) {
        AssetManager.callback();
      }
    }
  }

  public load (paths: any, callback: Function): void {
    AssetManager.loadedCount = 0;
    AssetManager.totalCount = getObjectCount(paths);
    AssetManager.callback = callback;

    for (let key in paths) {
      let asset;

      switch (this.getType(paths[key])) {
        case "audio":
          asset = new Audio();
          asset.src = key;
          asset.oncanplaythrough(() => {
            this.audio[key] = asset;
            this.onAssetLoad();
          });
          break;
        case "image":
          asset = new Image();
          asset.src = key;
          asset.onload(() => {
            this.images[key] = asset;
            this.onAssetLoad();
          });
          break;
        case "json":
          xhrGet(paths[key], (data) => {
            this.json[key] = asset;
            this.onAssetLoad();
          });
          break;
        default:
          throw new Error(`asset type for "${key}" not supported`);
      }
    }
  }

  public getType (path: string): string {
    if (path.indexOf(".mp3") > 0 || path.indexOf(".wav") > 0 || path.indexOf(".ogv") > 0) {
      return "audio";
    } else if (path.indexOf(".png") > 0 || path.indexOf(".jpg") > 0 || path.indexOf(".jpeg") > 0 || path.indexOf(".gif") > 0) {
      return "image";
    } else if (path.indexOf(".json") > 0) {
      return "json";
    }
  }

  public getAudio (): object {
    return this.audio;
  }

  public getImages (): object {
    return this.images;
  }

  public getJSON (): object {
    return this.json;
  }
}
