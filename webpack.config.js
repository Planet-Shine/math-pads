var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var lifecycleEvent = process.env.npm_lifecycle_event;
var isDev = lifecycleEvent === 'devserver';
var isProd = lifecycleEvent === 'build';
var isDemoBuild = lifecycleEvent === 'demo-build';

var config = {
    entry: "./src/main.js",
    devtool: 'inline-source-map',
    context: __dirname,
    output: {
        path: __dirname + '/public/build/',
        publicPath: "/build/", // Обязательно для devserver, чтобы знал куда привязываться к bundle.js.
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
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
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
                test: /\.jsx$/,
                loader: "react-hot!babel",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/i,
                loader: "file-loader?name=fonts/[name]-[hash].[ext]"
            }
        ]
    }
};

if (isDev) {
    config.module.loaders.push({
        test: /\.css$/,
        loader: "style-loader!css-loader!autoprefixer-loader",
        exclude: [/node_modules/, /public/]
    },
    {
        test: /\.less$/,
        loader: "style-loader!css-loader!autoprefixer-loader!less",
        exclude: [/node_modules/, /public/]
    });
} else if (isProd || isDemoBuild) {
    config.devtool = null;
    config.module.loaders.push({
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css-loader!autoprefixer-loader'),
        exclude: [/node_modules/, /public/]
    },
    {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', 'css-loader!autoprefixer-loader!less-loader'),
        exclude: [/node_modules/, /public/]
    });
    config.plugins = [new ExtractTextPlugin('style.css')];
}

if (isDemoBuild) {
    config.output = {
        path: __dirname + "/public/build/",
        publicPath: "/experiences/math-pads/build/", // Обязательно для devserver, чтобы знал куда привязываться к bundle.js.
        filename: "bundle.js"
    };
}

module.exports = config;