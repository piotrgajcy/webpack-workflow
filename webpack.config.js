const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const appThemeSrc =  '../WebpackWorkflowTest/WebpackWorkflowTest/App_Themes/test1';

module.exports = {
  context: path.resolve(__dirname, './'),
  entry: {
    /* app: './js/index.js',*/
    css: appThemeSrc + '/_style/Main.scss',
  },
  output: {
    path: path.resolve(__dirname, appThemeSrc + '/_style'),
    publicPath: '/_style/',
    filename: 'bundle.js'
  },
  devtool: "source-map",
  module: {
    rules: [
    {
      test: /\.(css|scss)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              minimize: true || {/* CSSNano Options */},
              sourceMap: true
            }
          },
          // {
          //   loader: 'postcss-loader'
          // },
          {
            loader: 'sass-loader', 
            options: {
              sourceMap: true
            }
          }
        ],
        publicPath: '/dist',
      })
    }]
  },

  plugins: [
    new ExtractTextPlugin('Main.css'),
  ]
}
