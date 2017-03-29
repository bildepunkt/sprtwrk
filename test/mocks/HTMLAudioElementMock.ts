import HTMLElementMock from "./HTMLElementMock";

export default class HTMLAudioElementMock extends HTMLElementMock {

  public src: string;

  constructor () {
    super("audio");
  }

  public oncanplaythrough (callback: Function): void {
    callback();
  }
}
