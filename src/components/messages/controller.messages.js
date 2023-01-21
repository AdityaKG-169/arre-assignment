// controllers are the functions that are called by the routes and have access to the request and response objects. They are responsible for calling the data access layer and returning the response to the client.

const { createMessage, loadMessages } = require('./dal.messages');

const createMessageController = async (req, res) => {
	const { groupId, messageText, messageSender } = req.body;

	const response = await createMessage({ groupId, messageText, messageSender });

	return res.status(response.status).json(response);
};

const loadMessagesController = async (req, res) => {
	const { groupId, page, limit } = req.params;

	const response = await loadMessages({ groupId, page, limit });

	return res.status(response.status).json(response);
};

module.exports = {
	createMessageController,
	loadMessagesController,
};
