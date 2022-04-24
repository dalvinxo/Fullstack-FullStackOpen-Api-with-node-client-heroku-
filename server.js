const express = require('express');
const path = require('path');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = require('./server/app');
const configuration = require('./server/utils/config.util');
const loggers = require('./server/utils/loggers.util');

const webpackConfig = require('./webpack.config.js');

const compiler = webpack(webpackConfig);

const webPackOption = {
	publicPath: webpackConfig.output.publicPath,
	serverSideRender: true
};

const devMiddleware = webpackDevMiddleware(compiler, webPackOption);

app.use(devMiddleware);
app.use(webpackHotMiddleware(compiler));

app.use('*', (req, res) => {

	const filename = path.join(compiler.outputPath, 'index.html');
	compiler.waitUntilValid(() => {
		compiler.outputFileSystem.readFileSync(filename, (err, result) => {
			if (err) return next(err);

			res.set('content-type', 'text/html');
			res.send(result).end();
		});
	});

});



// const BUILD_PATH = path.resolve(__dirname, './build');
// const INDEX_PATH = path.resolve(BUILD_PATH, 'index.html');

// app.use(express.static(BUILD_PATH));
// app.get('*', (req, res) => res.sendFile(INDEX_PATH));

const { PORT } = configuration;

app.listen(PORT, function () {
	loggers.information(`listening on port ${PORT}!\n`);
});