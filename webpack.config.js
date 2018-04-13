const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const babelenv = require('babel-preset-env');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


// const appThemeName = '_test1';
// const appThemeSrc = `../path/to/App_Themes/${appThemeName}`;

module.exports = {
  context: path.resolve(__dirname, './'),
  entry: {
    script: ['./polyfill.js', `${appThemeSrc}/src/scripts/script.js`,
      `${appThemeSrc}/src/sass/Main.scss`],
  },
  output: {
    path: path.resolve(__dirname, `${appThemeSrc}/dist`),
    filename: '[name].bundle.js',
    publicPath: 'http://localhost:8080/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {            
            presets: [babelenv],
          },
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          filename: 'css/[name].css',
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                // minimize: true || {/* CSSNano Options */},
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: path.resolve(__dirname, './css'),
                },
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('Main.css'),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: ['script.bundle.js', 'css.bundle.js'],
      noSources: true,
    }),
    new UglifyJSPlugin()
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(),
  ],
};
