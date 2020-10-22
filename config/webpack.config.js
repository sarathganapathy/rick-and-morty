const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const resolve = dir => path.join(__dirname, '../', dir);

const isDev = process.env.NODE_ENV !== 'production';

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: resolve('client/index.html'),
    filename: 'index.html',
    inject: 'body',
});

const MiniCssExtractPluginConfig = new MiniCssExtractPlugin({
    filename: isDev ? '[name].css' : '[name].[hash].css',
    chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
});

const CleanWebpackPluginConfig = new CleanWebpackPlugin(['dist'], {
    root: resolve('.'),
});

const copyWebpackPluginConfig = new CopyWebpackPlugin({
    patterns: [
        { from: 'client/assets', to: 'assets' }
    ]
});

module.exports = {
    devServer: {
        writeToDisk: true,
        contentBase: resolve('./dist'),
        historyApiFallback: true,
        inline: true,
        host: process.env.HOST, // Defaults to `localhost`
        port: 8000, // Defaults to 8080
        open: true, // Open the page in browser
    },
    entry: [
        './client/less/index.less',
        './client/js/index.js',
    ],
    output: {
        filename: isDev ? '[name].js' : '[name].[hash].js',
        path: resolve('dist'),
        publicPath: '/',
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|otf|ico|mp4)(\?\S*)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets',
                        name: '[name].[ext]',
                    },
                },
            },
            {
                test: /\.less$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        HtmlWebpackPluginConfig,
        MiniCssExtractPluginConfig,
        CleanWebpackPluginConfig,
        copyWebpackPluginConfig
    ],
    performance: {
        hints: false,
    },
};