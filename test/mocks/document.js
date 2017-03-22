var DomElement = require("./DomElement");
var document = new DomElement("document");

document.body = new DomElement("body");
document.createElement = function (type) {
  return new DomElement(type);
}

module.exports = document;
