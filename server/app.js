const express = require('express');
const mongoose = require('mongoose');
require('express-async-errors');

const loggers = require('./utils/loggers.util');
const configuration = require('./utils/config.util');
const middleware = require('./utils/middleware.util');

const BlogRoute = require('./controllers/blog.controller');
const UserRouter = require('./controllers/users.controller');
const LoginRouter = require('./controllers/login.controller');

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

// app.use(middleware.handleToken);

app.use('/api/blogs', BlogRoute);
app.use('/api/users', UserRouter);
app.use('/api/login', LoginRouter);

app.use(middleware.handleError);
// app.use(middleware.handleUnknownEndpoint);

module.exports = app;
