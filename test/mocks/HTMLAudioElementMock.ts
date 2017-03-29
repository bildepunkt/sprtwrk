import HTMLElementMock from "./HTMLElementMock";

export default class HTMLAudioElementMock extends HTMLElementMock {
  public oncanplaythrough: Function = null;
  public src: string = null;

  constructor () {
    super("audio");

    setTimeout(() => {
      this.oncanplaythrough();
    }, 100);
  }
}
