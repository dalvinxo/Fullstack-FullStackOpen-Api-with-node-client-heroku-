const information = (...message) => {
	console.log(`[INFO] ${message}`);
};

const advertence = (...message) => {
	console.log(`[ADVERTENCE] ${message}`);
};

module.exports = {
	information,
	advertence
};