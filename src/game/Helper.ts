export abstract class Helper {
  public static get screenDimensions() {
    var win = window,
      doc = document,
      docElem = doc.documentElement,
      body = doc.getElementsByTagName("body")[0],
      x = win.innerWidth || docElem.clientWidth || body.clientWidth,
      y = win.innerHeight || docElem.clientHeight || body.clientHeight;
    return { x, y };
  }
  public static randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  /** normalized vector between two objects */
  public static vectorBetween(o1, o2) {
    return new Phaser.Math.Vector2(o1.x - o2.x, o1.y - o2.y).normalize();
  }

  public static isLinuxFirefox(): boolean {
    // because it crash in soundManager
    let is_linux = /Linux/.test(window.navigator.platform);
    let is_firefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
    return is_firefox && is_linux;
  }
}
(window as any).helper = Helper;
