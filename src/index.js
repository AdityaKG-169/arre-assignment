const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const serverConfig = require('./config/server.config');
const db = require('./config/mongo.config');

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));	
app.use(helmet());
app.use(express.json());

// Handle errors from middlewares
app.use((err, _req, res) => {
	const responseObject = {
		type: 'error',
		status: 500,
		message: err.message,
		data: null,
		uniqueCode: 'SERVER_ERROR',
	};

	res.status(500).json(responseObject);
});

// Connect to Database
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// Health Check Route
app.get('/', (_req, res) => {
	const responseObject = {
		type: 'success',
		status: 200,
		message: 'Server is running',
		data: null,
		uniqueCode: 'SERVER_RUNNING',
	};
	res.status(200).json(responseObject);
});

// Routes
app.use('/api/messages', require('./components/messages/routes.messages'));

// 404 Route: This route should be the last route
app.get('*', (_req, res) => {
	const responseObject = {
		type: 'error',
		status: 404,
		message: 'Route not found',
		data: null,
		uniqueCode: 'ROUTE_NOT_FOUND',
	};

	res.status(404).json(responseObject);
});

// Start the server
const PORT = serverConfig.port;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
