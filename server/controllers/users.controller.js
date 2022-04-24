const UserRouter = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

UserRouter.get('/', async (req, res) => {
	const users = await User.find({});
	return res.json(users);
});

UserRouter.get('/:id', async(request, response) => {

	const result = await User.find({ _id: request.params.id });

	if(result){
		return response.json(result);
	}

	return response.status(404).json({
		error: 'there aren\'t users in Db'
	});

});

UserRouter.delete('/:id', async (request, response) => {

	const result = await User.findByIdAndRemove(request.params.id);

	if(result){
		return response.json(result);
	}

	return response.status(404).json({
		error: 'there aren\'t users in Db'
	});

});

UserRouter.put('/:id', async (request, response) => {

	const id = request.params.id;
	const body = request.body;

	const result = await User.findByIdAndUpdate({ _id: id }, body, { new : true });

	if(result){
		return response.json(result);
	}

	return response.status(404).json({
		error: 'user not found by this id'
	});

});


UserRouter.post('/', async (req, res) => {
	const body = req.body;

	const salt = bcrypt.genSaltSync(10);
	const passwordHash = await bcrypt.hashSync(body.password, salt);

	body.password = passwordHash;

	const user = new User(body);
	const result = await user.save();

	res.status(201).json(result);
});

module.exports = UserRouter;