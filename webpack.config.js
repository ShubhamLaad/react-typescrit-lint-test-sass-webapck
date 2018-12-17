const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');
const isProd = path.basename(require.main.filename) === 'webpack.js';


const entry = `${SRC_DIR}/index.tsx`;
const output = {
  filename: isProd ? '[name]-[hash].js' : '[name].js',
  path: DIST_DIR,
  publicPath: '/',
};
const resolve = {
  extensions: ['.js', '.ts', '.tsx'],
};
const webpackModule = {
  rules: [
    { test: /.tsx?$/, use: 'awesome-typescript-loader' },
    { enforce: 'pre', test: /.tsx?$/, use: 'source-map-loader' },
    {
      test: /\.css/,
      use: [
        {
          loader: !isProd ? "style-loader" : MiniCssExtractPlugin.loader,
        },
        "css-loader"
      ]
    },
    {
      test: /\.s(a|c)ss$/,
      use: [
        {
          loader: !isProd ? "style-loader" : MiniCssExtractPlugin.loader,
        },
        {
          loader: 'css-loader',
          options: {
            minimize: {
              safe: true
            }
          }
        },
        {
          loader: 'sass-loader'
        }
      ]
    },
    {
      test: /\.(eot|ttf|woff|woff2)$/,
      use: 'file-loader?name=[name].[ext]&outputPath=assets/fonts/',
    },
    {
      test: /\.(jpg|png|svg)$/,
      use: 'file-loader?name=[name].[ext]&outputPath=assets/images/',
    },
  ]
};

const devConfig = {
  mode: 'development',
  entry,
  output,
  resolve,
  module: webpackModule,
  devtool: 'source-map',
  devServer: {
    hot: true,
    inline: true,
  },
  plugins: [
    new htmlWebpackPlugin({
      template: `${SRC_DIR}/index.html`,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};

const prodConfig = {
  mode: 'production',
  entry,
  output,
  resolve,
  module: webpackModule,
  plugins: [
    new htmlWebpackPlugin({
      template: `${SRC_DIR}/index.html`,
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].min.css',
      chunkFilename: '[id].[hash].css',
    }),
  ],
};

module.exports = isProd ? prodConfig : devConfig;
