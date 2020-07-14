const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

const GLOBALS = {
  'process.env.NODE_ENV':JSON.stringify('production')
};

module.exports = {
    entry: [
      path.join(__dirname,'/src','index.js')
    ],
    output: {
      path: path.join(__dirname,'/dist'),
      publicPath: '/',
      filename: 'bundle.js'
    },
    mode: 'production',
    devtool: '',
    resolve: {
      modules: [path.resolve(__dirname, '/src'), 'node_modules']
    },
    devServer: {
      contentBase: path.join(__dirname,'/dist')
    },
    plugins: [
      new webpack.DefinePlugin(GLOBALS), //defines global env
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'public','index-template.html')
      }),
      new WebpackPwaManifest({
        name: 'mQuote - illustration calculator',
        short_name: 'mQuote',
        theme_color: "#db5945",
        background_color: '#ffffff',
        icons: [
          {
            src: path.resolve('src/public/mQuote_icon.png'),
            sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
          }
        ]
      }),
      new WorkboxWebpackPlugin.InjectManifest({
        swSrc: "./src/src-sw.prod.js",
        swDest: "sw.js"
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
        {test: /\.(png|svg|jpg|gif|ico|jpeg)$/,
          use: ['file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 30
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              }
            }
          }
        ]
        },
        {test: /\.(woff|woff2|eot|ttf)$/,
          use: ['url-loader?limit=100000']
        }
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
       }
    }
};