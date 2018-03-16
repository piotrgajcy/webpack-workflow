const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const appThemeName = 'WebpackSassTest';

const appThemeSrc =  '../path/to/App_Themes/' + appThemeName;

module.exports = {
  context: path.resolve(__dirname, './'),
  entry: {
    /* app: './src/scripts/script.js',*/
    css: appThemeSrc + '/src/sass/Main.scss',
  },
  output: {
    path: path.resolve(__dirname, appThemeSrc + '/dist'),
    filename: 'bundle.js',   
  },
  devtool: "nosources-source-map",  
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
              // minimize: true || {/* CSSNano Options */},
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname, './')                
              },
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader', 
            options: {
              sourceMap: true
            }
          }
        ],
        publicPath: '../../',
      })
    }]
  },

  plugins: [
    new ExtractTextPlugin('Main.css'),
  ]
}
