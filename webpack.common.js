const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src/'),
      assets: path.resolve(__dirname, 'src/assets/'),
      app: path.resolve(__dirname, 'src/app/'),
      authentication: path.resolve(__dirname, 'src/app/authentication/'),
      componentLib: path.resolve(__dirname, 'src/app/componentLib/'),
      features: path.resolve(__dirname, 'src/app/features/'),
      global: path.resolve(__dirname, 'src/app/global/'),
      pages: path.resolve(__dirname, 'src/app/pages/'),
      routes: path.resolve(__dirname, 'src/app/routes/'),
      utils: path.resolve(__dirname, 'src/app/utils/')
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
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              config: {
                path: './postcss.config.js'
              },
              plugins: loader => [require('autoprefixer')()]
            }
          },
          'sass-loader'
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
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new CopyWebpackPlugin(['./src/public'])
  ]
};
