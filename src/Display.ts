/**
 * @class Display
 */
export default class Display {
  /**
   * @private
   * @static
   * @member {number} uidCounter
   */
  private static uidCounter = 0;
  /**
   * @private
   * @member {number} uid
   */
  private uid;
  
  /**
   * @constructor
   */
  constructor () {
    this.uid = Display.uidCounter++;
  }
}
