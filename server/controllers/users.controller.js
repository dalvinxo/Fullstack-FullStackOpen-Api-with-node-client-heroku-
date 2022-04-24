const UserRouter = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

UserRouter.get('/', async (req, res) => {
	const users = await User.find({});
	return res.json(users);
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