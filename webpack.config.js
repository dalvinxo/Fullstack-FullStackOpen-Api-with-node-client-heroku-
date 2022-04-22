const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
	mode: 'development',
	entry: ['@babel/polyfill', './client/index.js'],
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'main.js',
		clean: true,
		publicPath: '/'
	},
	devServer: {
		static: path.resolve(__dirname, 'build'),
		compress: true,
		open: true
	},
	resolve: {
		alias: {
			Utilities: path.resolve(__dirname, 'client/util/'),
			Components: path.resolve(__dirname, 'client/components/'),
			Assets: path.resolve(__dirname, 'client/assets/'),
			'@root': path.resolve(__dirname)
		}
	},
	devtool: 'inline-source-map',
	plugins: [new HtmlWebpackPlugin({
		title: 'React App',
		template: 'index.html'
	})],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	}
};