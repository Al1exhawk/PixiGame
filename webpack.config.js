const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: [path.resolve(__dirname, 'src')],
                use: 'ts-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
            },
        ],
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Game',
            template: path.resolve(__dirname, 'src/index.html'),
        }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src/assets'), to: 'assets' },
                { from: path.resolve(__dirname, 'src/styles'), to: 'styles' },
            ],
        }),
        new webpack.ProvidePlugin({
            PIXI: 'pixi.js',
        }),
    ],
    resolve: {
        extensions: ['.ts', '.js'],
    },
    devServer: {
        contentBase: 'public',
    },

    output: {
        publicPath: 'public',
        filename: '[name].js',
        path: path.resolve(__dirname, 'public'),
    },
};
