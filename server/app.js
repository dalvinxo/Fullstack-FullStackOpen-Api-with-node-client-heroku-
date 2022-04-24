const express = require('express');


const blogRoute = require('./controllers/blog.controller');
const middleware = require('./utils/middleware.util');

const app = express();

app.use(express.json());
app.use(middleware.logger);

app.use('/api/blogs', blogRoute);

app.use(middleware.handleError);
app.use(middleware.handleUnknownEndpoint);

module.exports = app;