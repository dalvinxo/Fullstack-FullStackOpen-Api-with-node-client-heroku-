const express = require('express');


const blogRoute = require('./controllers/blog.controller');

const app = express();

app.use(express.json());

app.use('/api/blogs', blogRoute);

module.exports = app;