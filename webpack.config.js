var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'inline-source-map',
    context: path.resolve(__dirname, '.'),
    entry: path.resolve('./src/main.js'),
    watch: true,
    watchOptions: {
        aggrigateTimeout : 300
    },
    output: {
        path: path.normalize('./public/build/'),
        publicPath: "./",
        filename: "bundle.js"
    },
    progress: true,
    resolve: {
        modulesDirectories: [
            'src',
            'node_modules'
        ],
        extensions: ['', '.json', '.js', '.jsx']
    },
    module: {
        loaders: [{
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ["react", "es2015", "stage-0"],
                    plugins: [
                        "transform-decorators-legacy"
                    ]
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css-loader!autoprefixer-loader'),
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css-loader!autoprefixer-loader!less-loader'),
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.gif$/,
                loader: "url-loader?limit=10000&mimetype=image/gif"
            },
            {
                test: /\.jpg$/,
                loader: "url-loader?limit=10000&mimetype=image/jpg"
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=10000&mimetype=image/png"
            },
            {
                test: /\.svg/,
                loader: "url-loader?limit=26000&mimetype=image/svg+xml"
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/i,
                loader: "file-loader?name=build/fonts/[name]-[hash].[ext]"
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader: "file-loader?name=build/images/[name]-[hash].[ext]"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ]
};