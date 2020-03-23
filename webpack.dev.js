const merge = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");
const CircularDependencyPlugin = require("circular-dependency-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    publicPath: "/",
    contentBase: path.resolve(__dirname, "dist/"),
    watchContentBase: true,
    historyApiFallback: true
  },
  plugins: [
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: true,
      cwd: process.cwd()
    })
  ]
});
