var path = require("path");

module.exports = {
  entry: "./play/main.ts",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "play")
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        enforce: 'pre',
        test: /\.ts?$/,
        use: "source-map-loader"
      },
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        exclude: /(node_modules|test)/,
      },
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  devtool: 'inline-source-map',
};
