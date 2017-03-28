import Ticker from "../src/Ticker";
import { expect } from "chai";
import { spy } from "sinon";
import "mocha";

declare const global: Window;

const manualRafTick = (): void => {
  rafCallback();
}
let rafCallback;
let rafId = 0;

global.requestAnimationFrame = function (callback: Function): number {
  rafCallback = callback;
  return rafId++;
};
global.cancelAnimationFrame = function (id: number): void {
  rafCallback = null;
  rafId = 0;
};

describe("Ticker", () => {
  let cb, ticker;

  beforeEach(() => {
    cb = spy();
    ticker = new Ticker(cb);
  });

  it("executes callback on raf tick", () => {
    ticker.start();
    manualRafTick();
    expect(cb.calledOnce).to.be.true;
  });
});
