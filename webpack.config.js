var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    cache: true,
    devtool: 'eval',
    entry: './src/app.js',
    output:  {
        path: path.join(__dirname, '/www/dist'),
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.js*/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel']
            },
            { 
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!less-loader")
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'www')
    },
    plugins: [
        new ExtractTextPlugin("styles.css", {allChunks: true})
    ]
}