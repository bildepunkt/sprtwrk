exports.createAsset = function (type) {
  switch (type) {
    case "audio":
      return function Audio () {
        this.oncanplaythrough = function (callback) {
          callback();
        };
        setTimeout(this.canplaythrough, 0);
      };
    case "image":
      return function Image () {
        this.onload = function (callback) {
          callback();
        };
        setTimeout(this.onload, 0);
      };
  }
};
