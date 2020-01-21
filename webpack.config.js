const path = require('path');

module.exports = {
  mode: "development",
  entry: "./src",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {test: /\.ts$/, exclude: /node_modules/, loader: 'ts-loader'}
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  target: "node"
}