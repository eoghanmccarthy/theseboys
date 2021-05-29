const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { NODE_ENV } = process.env;

module.exports = {
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
              plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-transform-runtime']
            }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env', 'postcss-flexibility']
              }
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
  }
};
