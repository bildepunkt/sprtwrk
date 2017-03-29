import HTMLElementMock from "./HTMLElementMock";

export default class HTMLImageElementMock extends HTMLElementMock {
  public onload: Function = null;
  public width: number = null;
  public height: number = null;
  public src: string = null;

  constructor() {
    super("image");

    setTimeout(() => {
      this.onload();
    }, 100);
  }
}
