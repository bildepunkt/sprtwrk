import HTMLElementMock from "./HTMLElementMock";

export default class HTMLImageElementMock extends HTMLElementMock {

  public width: number = null;
  public height: number = null;
  public src: string = null;

  constructor() {
    super("image");
  }

  public onload (callback: Function): void {
    callback();
  }
}
