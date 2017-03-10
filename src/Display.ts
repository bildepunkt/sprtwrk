/**
 * @class Display
 */
export default class Display {
  private static uidCounter = 0;
  private uid;
  
  constructor () {
    this.uid = Display.uidCounter++;
  }
}
