const LoginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

const configuration = require('../utils/config.util');

LoginRouter.post('/', async (req, res) => {

	const { username, password } = req.body;

	const user = await User.findOne({ username });

	const passwordCorrect = user ? await bcrypt.compare(password, user.password) : false;

	if(!(user && passwordCorrect)){
		return res.status(401).json({
			error: 'username or passowrd invalid'
		});
	}

	const ForToken = {
		username, password
	};

	const token = jwt.sign(ForToken, configuration.SECRET);

	return res.json({ ...ForToken, token });

});


module.exports = LoginRouter;