const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname + "/dist/",
        filename: "bundle.js",
        publicPath: '/'
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"}
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: "url-loader?name=[name].[ext]"
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                //use: ["file-loader?name=/img/[name].[ext]"]
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '/img/[name].[ext]',
                        outputPath: '.',
                        useRelativePath: true,
                    },
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {}
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: "./img",
                    to: "./img",
                    force: true
                }
            ]
        })
    ],
    devServer: {
        historyApiFallback: true,
        port: 3030,
        static: true,
        hot: true,
        proxy: {
            "/restaurant/": {
                target: "http://localhost:8080"
            }
        }
    }

};