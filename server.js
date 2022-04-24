const express = require('express');
const path = require('path');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = require('./server/app');
const configuration = require('./server/utils/config.util');

const config = require('./webpack.config.js');
const compiler = webpack(config);





app.use(
	webpackDevMiddleware(compiler, {
		publicPath: config.output.publicPath,
	})
);

// const BUILD_PATH = path.resolve(__dirname, './build');
// const INDEX_PATH = path.resolve(BUILD_PATH, 'index.html');

// app.use(express.static(BUILD_PATH));
// app.get('*', (req, res) => res.sendFile(INDEX_PATH));

const { PORT } = configuration;

app.listen(PORT, function () {
	console.log(`Example app listening on port ${PORT}!\n`);
});