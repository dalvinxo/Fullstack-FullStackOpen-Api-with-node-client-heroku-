const morgan = require('morgan');
const { request } = require('../app');

morgan.token('body', (req) => (req.body ? JSON.stringify(req.body) : 'Body is empty'));

const token = (resquest, response, next) => {

	const authorization = request.get('Authorization') | false;

	if(authorization && authorization.toLowerCase().startswith('bearer ')){
		request.token = authorization.subString(7);
		return resquest;
	}

	return null;
};


const handleError = (error, request, response, next) => {

	if (error.name === 'ValidationError') {
		return response.status(400).json({
			error: error.message
		});
	}

	if(error.name === 'CastError'){
		return response.status(400).json({
			error: error.message
		});
	}

	if(error.name === 'JsonWebTokenError'){
		return response.status(400).json({
			error: error.message
		});
	}

	next(error);
};

const handleUnknownEndpoint = (request, response) => {
	response.status(404).json({
		error: 'Unknown endpoint'
	});
};


module.exports = {
	morganLogger: morgan(':method :url :status :res[content-length] - :response-time ms :body'),
	handleToken: token,
	handleError,
	handleUnknownEndpoint
};