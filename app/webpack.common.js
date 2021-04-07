const path = require('path');
const merge = require('webpack-merge');
const base = require('../webpack.base.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(base, {
  entry: './index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src/'),
      assets: path.resolve(__dirname, 'assets/'),
      authentication: path.resolve(__dirname, 'src/authentication/'),
      componentLib: path.resolve(__dirname, 'src/componentLib/'),
      features: path.resolve(__dirname, 'src/features/'),
      global: path.resolve(__dirname, 'src/global/'),
      pages: path.resolve(__dirname, 'src/pages/'),
      routes: path.resolve(__dirname, 'src/routes/'),
      utils: path.resolve(__dirname, 'src/utils/')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      template: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ]
});
