/**
 * @class Ticker
 */
export default class Ticker {
  private callback: (delta: number) => undefined;
  private canTick: boolean = true;
  private maxDelta: number = 32;
  private reqId: number;
  private then: number;

  constructor (callback) {
    this.callback = callback;
    this.tick = this.tick.bind(this);
    this.then = Date.now();
  }

  public tick (): void {
    if (!this.canTick) {
      return;
    }

    const now: number = Date.now();
    // cap delta so things don't go haywire on "blur"
    const delta: number = Math.min(now - this.then, this.maxDelta);

    this.callback(delta);
    this.then = now;

    this.reqId = requestAnimationFrame(this.tick);
  }

  public start (): void {
    this.reqId = requestAnimationFrame(this.tick);
  }

  public stop (): void {
    this.canTick = false;
    cancelAnimationFrame(this.reqId);
  }
}
