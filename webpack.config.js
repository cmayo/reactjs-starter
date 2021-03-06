var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

module.exports = {
    entry: resolveApp('src/app.js'),
    output: {
        path: path.join(__dirname, 'www'),
        publicPath: '/',
        pathinfo: true,
        filename: 'static/js/app.js'
    },
    resolve: {
		modulesDirectories: [
			'node_modules'
		]
    },
    module: {
        loaders: [
            {
                test: /\.js*/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel']
            },
            {
				test: /\.(less|css)$/,
				exclude: /\b(some\-css\-framework|whatever)\b/i,
				loader: ExtractTextPlugin.extract("style?sourceMap", "css?sourceMap!autoprefixer?browsers=last 2 version!less")
            }
        ]
    },
    plugins: ([
		// Avoid publishing files when compilation failed:
		new webpack.NoErrorsPlugin(),

		// Aggressively remove duplicate modules:
		new webpack.optimize.DedupePlugin(),

		// Write out CSS bundle to its own file:
		new ExtractTextPlugin('static/css/styles.css', { allChunks: true })
	]).concat(process.env.WEBPACK_ENV==='dev' ? [] : [
		new webpack.optimize.OccurenceOrderPlugin(),

		// minify the JS bundle
		new webpack.optimize.UglifyJsPlugin({
			output: { comments: false },
			exclude: [ /\.min\.js$/gi ]		// skip pre-minified libs
		})
    ]),
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'www')
    }
}