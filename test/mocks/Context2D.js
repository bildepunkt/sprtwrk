module.exports = (function () {
  return function Context2D () {
    this.canvas = null;
    this.fillStyle = "#000000";
    this.filter = "none";
    this.font = "10px sans-serif";
    this.globalAlpha = 1;
    this.globalCompositeOperation = "source-over";
    this.imageSmoothingEnabled = true;
    this.lineCap = "butt";
    this.lineDashOffset = 0;
    this.lineJoin = "miter";
    this.lineWidth = 1;
    this.miterLimit = 10;
    this.shadowBlur = 0;
    this.shadowColor = "rgba(0, 0, 0, 0)";
    this.shadowOffsetX = 0;
    this.shadowOffsetY = 0;
    this.strokeStyle = "#000000";
    this.textAlign = "start";
    this.textBaseline = "alphabetic";
    this.webkitImageSmoothingEnabled = true;
    this.arc = function () {};
    this.arcTo = function () {};
    this.beginPath = function () {};
    this.bezierCurveTo = function () {};
    this.clearRect = function () {};
    this.clip = function () {};
    this.closePath = function () {};
    this.createImageData = function () {};
    this.createLinearGradient = function () {};
    this.createPattern = function () {};
    this.createRadialGradient = function () {};
    this.drawFocusIfNeeded = function () {};
    this.drawImage = function () {};
    this.ellipse = function () {};
    this.fill = function () {};
    this.fillRect = function () {};
    this.fillText = function () {};
    this.getContextAttributes = function () {};
    this.getImageData = function (x, y, width, height) {
      return {
        data: new Uint8ClampedArray([]),
        width: width,
        height: height
      };
    };
    this.getLineDash = function () {};
    this.isPointInPath = function () {};
    this.isPointInStroke = function () {};
    this.lineTo = function () {};
    this.measureText = function () {};
    this.moveTo = function () {};
    this.putImageData = function () {};
    this.quadraticCurveTo = function () {};
    this.rect = function () {};
    this.resetTransform = function () {};
    this.restore = function () {};
    this.rotate = function () {};
    this.save = function () {};
    this.scale = function () {};
    this.setLineDash = function () {};
    this.setTransform = function () {};
    this.stroke = function () {};
    this.strokeRect = function () {};
    this.strokeText = function () {};
    this.transform = function () {};
    this.translate = function () {};
  };
}).apply(this);
