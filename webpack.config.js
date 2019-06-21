const path = require('path');
module.exports = {
    mode: "development",
    devtool: "source-map", // Enable source map for debugging
    devServer: {
        contentBase: './public'
    },
    entry: ['babel-polyfill', './src/index.js'],  // Entry file

    output: {  // compiled file in ./dist
        path: path.resolve(__dirname, 'public/dist'),
        filename: 'dragging.js'
    },
    module: {
        rules: [
            { // model for sass
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            }
        ]
    },
};

