const dotenv = require('dotenv');
dotenv.config();

// Default values for the serverConfig object
const DEFAULT_PORT = 3000;
const DEFAULT_MONGO_URI = 'mongodb://localhost:27017/arre_assessment';

const serverConfig = {
	development: {
		port: DEFAULT_PORT,
		mongoUri: DEFAULT_MONGO_URI,
	},
	production: {
		port: Number(process.env.PORT) || DEFAULT_PORT,
		mongoUri: process.env.MONGO_URI || DEFAULT_MONGO_URI,
	},
};

// Exports the serverConfig object based on the NODE_ENV environment variable. If NODE_ENV is not set, it defaults to 'development'.
const env = process.env.NODE_ENV || 'development';
module.exports = serverConfig[env];
