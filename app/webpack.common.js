const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'assets/'),
      src: path.resolve(__dirname, 'src/'),
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
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: loader => [require('autoprefixer')()]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|svg|gif|mp3|mp4|ttf|eot|woff)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './assets/'
            }
          }
        ]
      }
    ]
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
};
