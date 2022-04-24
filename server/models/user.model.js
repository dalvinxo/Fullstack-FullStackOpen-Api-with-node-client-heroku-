const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		require: [true, 'The {PATH} is required'],
		minLength: [3, '{PATH} must have at least 3 digits'],
		unique: true
	},
	name: {
		type: String
	},
	password: {
		type: String,
		require: [true, 'The {PATH} is required']
	},
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Blog'
		}
	]
},
{
	toJSON:{
		transform: (document, returnObject) => {
			returnObject.id = returnObject._id.toString();
			delete returnObject.__v;
			delete returnObject._id;
			delete returnObject.password;
			delete returnObject.status;
		}
	}

});

UserSchema.plugin(uniqueValidator,
	{   type: 'mongoose-unique-validator',
		message: 'Error, expected {PATH} to be unique.'
	});

module.exports = mongoose.model('User', UserSchema);