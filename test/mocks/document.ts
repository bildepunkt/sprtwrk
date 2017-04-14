class Context {
  
}

class Element {
  public width = 0;
  public height = 0;
  public src = "";
  public canplaythrough = null;
  public onload = null;

  constructor (type) {
    switch (type) {
      case "image":
        setTimeout(this.onload, 512);
        break;
      case "audio":
        setTimeout(this.canplaythrough, 512);
        break;
    }
  }
  
  getContext (type) {
    return new Context();
  }
}

export default {
  createElement (type) {
    return new Element(type);
  }
};
