const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')


// const appThemeName = 'WebpackSassTest';
const appThemeName = 'test1';

// const appThemeSrc =  '../path/to/App_Themes/' + appThemeName;
const appThemeSrc =  '../WebpackWorkflowTest/WebpackWorkflowTest/App_Themes/' + appThemeName;

module.exports = {
  context: path.resolve(__dirname, './'),
  entry: {
    script: appThemeSrc + '/src/scripts/script.js',
    css: appThemeSrc + '/src/sass/Main.scss',
  },
  output: {
    path: path.resolve(__dirname, appThemeSrc + '/dist'),
    filename: '[name].bundle.js',   
  },
  // devtool: "nosources-source-map",  
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
            options: {
              // babelrc: path.join(process.cwd(), './babelrc'),
              // presets: ['babel-preset-env']
            }        
        }],
        exclude: /node_modules/
      },
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
                ident: 'postcss',
                // plugins: () => [autoprefixer({browsers: 'ie 10'})],
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
          // publicPath: '../../',
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('Main.css'),
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map",
      exclude: ["script.bundle.js", "css.bundle.js"],
      noSources: true
    })
  ]
}
