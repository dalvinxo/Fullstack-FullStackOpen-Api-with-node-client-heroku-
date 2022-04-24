const morgan = require('morgan');

morgan.token('body', (req) => (req.body ? JSON.stringify(req.body) : 'Body is empty'));

const handleError = (error, response, request, next) => {

	if (error.name === 'ValidationError') {
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
	handleError,
	handleUnknownEndpoint
};