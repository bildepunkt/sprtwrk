import HTMLElementMock from "./HTMLElementMock";

export default class HTMLImageElementMock extends HTMLElementMock {

  public width: number;
  public height: number;
  public src: string;

  constructor(type: string) {
    super(type);
  }
}
