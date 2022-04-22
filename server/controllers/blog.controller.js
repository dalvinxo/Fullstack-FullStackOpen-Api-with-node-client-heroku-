const blogRoute = require('express').Router();


blogRoute.get('/', (req, res) => {
	res.send('Blog route');
});