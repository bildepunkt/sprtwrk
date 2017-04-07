import { getObjectCount, xhrGet } from "./util";

/**
 * @class AssetManagerDebugger
 */
export class AssetManagerDebugger {
  private doDebug: boolean;

  constructor (doDebug: boolean) {
    this.doDebug = doDebug;
  }

  public onLoad (type: string, path: string, loaded: number, count: number): void {
    if (this.doDebug) {
      console.log(`${type}: ${path} - ${loaded} / ${count} loaded`);
    }
  }
}

/**
 * @class AssetManager
 */
export default class AssetManager {
  private static loadedCount: number;
  private static totalCount: number;
  private static callback: Function;

  private debugger: AssetManagerDebugger;
  private images: object = {};
  private audio: object = {};
  private json: object = {};

  constructor (paths?: object, callback?: Function, doDebug: boolean = true) {
    if (paths && callback) {
      this.load(paths, callback);
    }

    this.debugger = new AssetManagerDebugger(doDebug);
  }

  private onAssetLoad (type: string, path: string): void {
    AssetManager.loadedCount++;

    this.debugger.onLoad(type, path, AssetManager.loadedCount, AssetManager.totalCount);

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
          asset = document.createElement("audio");
          asset.src = key;
          asset.oncanplaythrough = () => {
            this.audio[key] = asset;
            this.onAssetLoad("audio", paths[key]);
          };
          break;
        case "image":
          asset = document.createElement("image");
          asset.src = key;
          asset.onload = () => {
            this.images[key] = asset;
            this.onAssetLoad("image", paths[key]);
          };
          break;
        case "json":
          xhrGet(paths[key], (data: object) => {
            this.json[key] = asset;
            this.onAssetLoad("json", paths[key]);
          });
          break;
        default:
          throw new Error(`asset type for "${paths[key]}" not supported`);
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
