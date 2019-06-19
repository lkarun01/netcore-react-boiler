const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const extractCSS = new MiniCssExtractPlugin({ filename: `allstyles.css` });
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    entry: { 'main': './wwwroot/src/index.js' },
    output: {
        path: path.resolve(__dirname, 'wwwroot/dist'),
        filename: 'bundle.js',
        publicPath: 'dist/'
    },
    plugins: [
        extractCSS,
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                warnings: false,
                ie8: false,
                output: {
                    comments: false
                }
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/, use: [{ loader: MiniCssExtractPlugin.loader, }, "css-loader"] },
            //{ test: /\.css$/, use: [{ loader: "style-loader" },{ loader: "css-loader" }] },
            { test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader', options: {
                    presets:
                        ['@babel/preset-react','@babel/preset-env']
                }
            }
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    }
};