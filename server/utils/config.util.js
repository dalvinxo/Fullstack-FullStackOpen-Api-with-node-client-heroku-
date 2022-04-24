const ENVIROMENT = process.env.NODE_ENV || 'development';

if(ENVIROMENT !== 'production') {
	require('dotenv').config();
}

PORT = process.env.PORT || 3000;
DB_MONGO_URI = process.env.DB_MONGO_URI;
SECRET = process.env.SECRET;

module.exports = {
	ENVIROMENT,
	DB_MONGO_URI,
	SECRET,
	PORT
};