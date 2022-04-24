const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'development',
	entry: ['@babel/polyfill', './client/index.js'],
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'main.js',
		clean: true,
		publicPath: '/'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.css', '.json'],
		alias: {
			Utilities: path.resolve(__dirname, 'client/util/'),
			Components: path.resolve(__dirname, 'client/components/'),
			Assets: path.resolve(__dirname, 'client/assets/'),
			'@root': path.resolve(__dirname)
		}
	},
	devtool: 'inline-source-map',
	plugins: [
		new webpack.DefinePlugin({
			SERVER_MODE: JSON.stringify('development')
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({
			'React': 'react'
		}),
		new MiniCssExtractPlugin(),
		new HtmlWebpackPlugin({
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
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			}
		]
	}
};