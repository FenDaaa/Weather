const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const config = {
  entry: {
      xcharts: './src/js/xcharts.js',
  },
  devtool: 'inline-source-map',
  devServer: {
        //contentBase: 'Weather',
        hot: true
    },
  plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Caching',
            template: 'WeatherService.html'
        }),
        new webpack.NamedModulesPlugin(),
        //注：热更新（HMR）不能和[chunkhash]一起使用
        new webpack.HotModuleReplacementPlugin(),
        //配置当前是生产环境还是开发环境，用于生产环境的优化
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('dev')
        }),
        new ExtractTextPlugin("[name].css"),
    ],
  output: {
    //注：热更新（HMR）不能和[chunkhash]一起使用
    //1： 如果是开发环境，将配置文件中的chunkhash 替换为hash
    //2： 如果是生产环境，不要使用参数 --hot
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist/js'),
    //本项目中可以不用publicPath
    //publicPath: '.'
  },
  module: {
        rules: [
            {
                test: /\.css$/,
                //use: [
                 //   'style-loader',
                //    'css-loader'
                //],
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                  })
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
};

module.exports = config;