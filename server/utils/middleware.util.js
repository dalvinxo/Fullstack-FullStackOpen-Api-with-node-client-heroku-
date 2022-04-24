const morgan = require('morgan');

morgan.token('body', (req) => (req.body ? JSON.stringify(req.body) : 'Body is empty'));

const token = (req, res, next) => {

	const authorization = req.headers['authorization'];

	if(authorization && authorization.toLowerCase().startsWith('bearer ')){
		req.token = authorization.substring(7);
	}

	return next();
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
	getToken: token,
	handleError,
	handleUnknownEndpoint
};