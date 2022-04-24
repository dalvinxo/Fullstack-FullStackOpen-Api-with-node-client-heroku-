const blogRoute = require('express').Router();
const Blog = require('../models/blog.model');
const User = require('../models/user.model');

const helper = require('../utils/helper.util');

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


blogRoute.post('/', async (request, response) => {

	const token = request.token;

	const userAuthenticated = await helper.validToken(token);

	if(!userAuthenticated){
		return response.status(401).json({
			error: 'token missing or invalid'
		});
	}

	const user = await User.findById(userAuthenticated.id);

	const body = request.body;
	body.user = user.id;

	const newBlog = new Blog(request.body);
	const result = await newBlog.save();
	const blog = result.toJSON();

	user.blogs = user.blogs.concat(blog.id);
	await User.findByIdAndUpdate({ _id: user.id }, user);

	return response.status(201).json(blog);

});


blogRoute.delete('/:id', async (request, response) => {

	const { id } = request.params;
	const token = request.token;

	const userAuthenticated = await helper.validToken(token);

	if(!userAuthenticated){
		return response.status(401).json({
			error: 'token missing or invalid'
		});
	}

	const blogUser = await Blog.findById( { _id : id });

	if(!blogUser){
		return response.status(404).json({
			error: 'There isn\'t blog by this ID'
		});
	}

	const isTheUserBlog = blogUser.user.toString() !== userAuthenticated.id;

	if(isTheUserBlog){
		return response.status(401).json({
			error: 'This users can\'t delete this blog '
		});
	}

	await Blog.findByIdAndRemove({ _id : blogUser.id });
	return response.status(204).end();


});

blogRoute.put('/:id', async (request, response) => {

	const { id } = request.params;
	const body = request.body;

	const result = await Blog.findByIdAndUpdate({ _id : id }, body, { new: true })
		.populate('user', { username: 1, name: 1 });

	if(result){
		return response.json(result);
	}

	return response.status(404).json({
		error: 'There are not blog with this ID in db'
	});
});




module.exports = blogRoute;