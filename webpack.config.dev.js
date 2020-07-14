const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
      'webpack-hot-middleware/client?reload=true',
      path.join(__dirname,'/src','index.js')
    ],
    output: {
      path: path.join(__dirname,'/dist'),
      publicPath: '/',
      filename: 'bundle.js'
    },
    mode: 'development',
    devtool: 'inline-source-map',
    resolve: {
      modules: [path.resolve(__dirname, '/src'), 'node_modules']
    },
    devServer: {
      contentBase: path.join(__dirname,'/src'),
      historyApiFallback: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'public','index.html')
      })
    ],
    module: {
      rules: [
        {test: /\.(js|jsx)$/, exclude: /node_modules/, 
          use: { loader: "babel-loader"}
        },
        {test: /\.css$/, exclude: /node_modules/,
          use: [
            {
              loader: 'style-loader'
           },
           {
              loader: 'css-loader',
              options: {
                 modules: true
              }
           }
          ]
        },
        {test: /\.css$/, include: /node_modules/,
          use: ['style-loader','css-loader']
        },
        {test: /\.(png|svg|jpg|gif|ico|jpeg)$/, exclude: /node_modules/,
          use: ['file-loader']
        },
        {test: /\.(woff|woff2|eot|ttf)$/,
          use: ['url-loader?limit=100000']
        }
      ]
    }
};