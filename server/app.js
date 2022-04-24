const express = require('express');
const mongoose = require('mongoose');
require('express-async-errors');


const blogRoute = require('./controllers/blog.controller');

const loggers = require('./utils/loggers.util');
const configuration = require('./utils/config.util');
const middleware = require('./utils/middleware.util');


mongoose.connect(configuration.DB_MONGO_URI).then(result => {
	loggers.information('Connected to MongoDB');
}).catch(error => {
	loggers.advertence(error);
});

const app = express();

app.use(express.json());
if(configuration.ENVIROMENT !== 'production') {
	app.use(middleware.morganLogger);
}

app.use('/api/blogs', blogRoute);

app.use(middleware.handleError);
// app.use(middleware.handleUnknownEndpoint);

module.exports = app;
