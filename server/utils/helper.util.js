const jwt = require('jsonwebtoken');
const configuration = require('../utils/config.util');

const validToken = async (token) => {

	if(!token){
		return false;
	}

	const decodeToken = await jwt.verify(token, configuration.SECRET);

	return decodeToken;
};

module.exports = {
	validToken
};