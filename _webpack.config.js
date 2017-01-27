var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var lifecycleEvent = process.env.npm_lifecycle_event;
var combineLoaders = require("webpack-combine-loaders");


var isDev = lifecycleEvent === 'devserver';
var isProd = lifecycleEvent === 'build';

console.log('isDev: ' + isDev);
console.log('isProd: ' + isProd);

var config = {
    // devtool: 'inline-source-map',
    // context: path.resolve(__dirname, '.'),
    entry: './src/main.js',
    /*watch: true,
    watchOptions: {
        aggrigateTimeout : 300
    },*/
    output: {
        path: './public/build/',
        publicPath: "./",
        filename: "bundle.js"
    },
    resolve: {
        modulesDirectories: [
            'src',
            'node_modules'
        ],
        extensions: ['', '.json', '.js', '.jsx']
    },
    module: {
        loaders: []
    },
    plugins: []
};


if (isDev) {
    config.module.loaders.push({
        test: /\.js$/,
        loader: "babel",
        exclude: [/node_modules/, /public/]
    },
    {
        test: /\.css$/,
        loader: "style-loader!css-loader!autoprefixer-loader",
        exclude: [/node_modules/, /public/]
    },
    {
        test: /\.less$/,
        loader: "style-loader!css-loader!autoprefixer-loader!less",
        exclude: [/node_modules/, /public/]
    },
    {
        test: /\.jsx$/,
        loader: "react-hot!babel",
        exclude: [/node_modules/, /public/]
    });
} else if (isProd) {
    config.module.loaders.push({
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
    });
}

config.module.loaders.push(
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
);

if (isProd) {
    config.module.plugins.push(new ExtractTextPlugin('style.css'));
}


module.exports = config;