const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const babelenv = require('babel-preset-env');

// const appThemeName = '_test1';
// const appThemeSrc = `../path/to/App_Themes/${appThemeName}`;

module.exports = {
  context: path.resolve(__dirname, './'),
  entry: {
    script: ['./polyfill.js', `${appThemeSrc}/src/scripts/script.js`]      
  },
  output: {
    path: path.resolve(__dirname, `/dist`),
    filename: '[name].bundle.js',
    publicPath: 'http://localhost:8080/',
  },
  devServer: {
    contentBase: path.join(__dirname, `${appThemeSrc}/dist`),
    hot: true,
    inline: true,
    host: 'localhost',
    port: 8080,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            // babelrc: true,
            presets: [babelenv],
          },
        }],
        exclude: /node_modules/,
      }
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};
