const blogRoute = require('express').Router();
const Blog = require('../models/blog.model');

blogRoute.get('/', async (req, res) => {
	const blogs = await Blog.find().populate('user', { username: 1, name: 1 });
	res.status(200).json(blogs);
});

blogRoute.get('/:id', async (req, res) => {
	const { id } = req.params;
	const blog = await Blog.findById(id);
	if (!blog) {
		return res.status(404).json({ error: 'blog not found' });
	}

	res.status(200).json(blog);
});

blogRoute.delete('/:id', async (req, res) => {
	const { id } = req.params;

	const blogs = await Blog.findByIdAndRemove({ _id: id });

	if(blogs) {
		return res.status(204).end();
	}

	res.status(404).json({
		error: 'blog not found with this ID'
	});

});

const getToken = (authorization) => {

	if(authorization && authorization.toLowerCase().startsWith('bearer ')){
		return authorization.substring(7);
	}

	return;
};

blogRoute.post('/', async (req, res) => {

	const authorization = req.get('Authorization');
	const token = getToken(authorization);

	return res.json(req, authorization, token);

	// const body = req.body;
	// const newBlog = new Blog(body);

	// const result = await newBlog.save();
	// res.status(201).json(result);
});


blogRoute.put('/:id', async (req, res) => {
	const { id } = req.params;
	const body = req.body;
	const blog = await Blog.findByIdAndUpdate(id, body, { new: true });
	if (!blog) {
		return res.status(404).json({ error: 'blog not found' });
	}
	res.status(200).json(blog);
});


module.exports = blogRoute;