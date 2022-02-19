const path = require('path');
const merge = require('webpack-merge');
const base = require('../webpack.base.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(base, {
  entry: './index.js',
  output: {
    path: path.resolve(process.cwd(), '../dist'),
    publicPath: '/',
    clean: true
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src/'),
      assets: path.resolve(__dirname, 'assets/'),
      components: path.resolve(__dirname, 'src/components/'),
      hooks: path.resolve(__dirname, 'src/hooks/'),
      pages: path.resolve(__dirname, 'src/pages/'),
      routes: path.resolve(__dirname, 'src/routes/'),
      utils: path.resolve(__dirname, 'src/utils/')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './index.html'
    })
  ]
});
