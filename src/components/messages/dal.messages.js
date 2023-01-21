// The data access layer for messages
// Seperated from the model and the controllers to allow for easier testing

const Message = require('./model.messages');

// api to create a new message
// @param context: the context object containing the {groupId, messageText, messageSender}
const createMessage = async (context) => {
	try {
		const { groupId, messageText, messageSender } = context;

		if (typeof groupId !== 'string' || !groupId || !groupId.trim()) {
			return {
				type: 'error',
				status: 400,
				message: 'Group id is not valid',
				data: null,
				uniqueCode: 'INVALID_GROUP_ID',
			};
		}

		if (
			typeof messageText !== 'string' ||
			!messageText ||
			!messageText.trim()
		) {
			return {
				type: 'error',
				status: 400,
				message: 'Message text is not valid',
				data: null,
				uniqueCode: 'INVALID_MESSAGE_TEXT',
			};
		}

		if (
			typeof messageSender !== 'string' ||
			!messageSender ||
			!messageSender.trim()
		) {
			return {
				type: 'error',
				status: 400,
				message: 'Message sender is not valid',
				data: null,
				uniqueCode: 'INVALID_MESSAGE_SENDER',
			};
		}

		const formattedMessage = messageText.trim();
		const formattedSender = messageSender.trim();
		const formattedGroupId = groupId.trim();

		const newMessage = new Message({
			messageGroupId: formattedGroupId,
			messageText: formattedMessage,
			messageSender: formattedSender,
		});

		const savedMessage = await newMessage.save();

		if (!savedMessage) {
			return {
				type: 'error',
				status: 500,
				message: 'Error creating message',
				data: null,
				uniqueCode: 'ERROR_CREATING_MESSAGE',
			};
		}

		return {
			type: 'success',
			status: 201,
			message: 'Message created successfully',
			data: savedMessage,
			uniqueCode: 'MESSAGE_CREATED_SUCCESSFULLY',
		};
	} catch (err) {
		console.log(err);
		return {
			type: 'error',
			status: 500,
			message: 'Internal server error',
			data: null,
			uniqueCode: 'INTERNAL_SERVER_ERROR',
		};
	}
};

// api to load messages in the group in the paginated manner
// @param context: the context object containing the {groupId, page, limit}
// Page starts from 1 and limit starts from 1
// If page or limit is not provided, default values are used. Default page is 1 and default limit is 10
const loadMessages = async (context) => {
	try {
		const { groupId, page, limit } = context;

		const DEFAULT_PAGE = 1;
		const DEFAULT_LIMIT = 10;

		if (typeof groupId !== 'string' || !groupId || !groupId.trim()) {
			return {
				type: 'error',
				status: 400,
				message: 'Group id is not valid',
				data: null,
				uniqueCode: 'INVALID_GROUP_ID',
			};
		}

		if (typeof page !== 'number' || page < 1) {
			return {
				type: 'error',
				status: 400,
				message: 'Page is not valid',
				data: null,
				uniqueCode: 'INVALID_PAGE',
			};
		}

		if (typeof limit !== 'number' || limit < 1) {
			return {
				type: 'error',
				status: 400,
				message: 'Limit is not valid',
				data: null,
				uniqueCode: 'INVALID_LIMIT',
			};
		}

		const formattedGroupId = groupId.trim();
		const formattedPage = page || DEFAULT_PAGE;
		const formattedLimit = limit || DEFAULT_LIMIT;

		const messages = await Message.find({
			messageGroupId: formattedGroupId,
		})
			.sort({ createdAt: -1 })
			.skip((formattedPage - 1) * formattedLimit)
			.limit(formattedLimit);

		if (!messages) {
			return {
				type: 'error',
				status: 500,
				message: 'Error loading messages',
				data: null,
				uniqueCode: 'ERROR_LOADING_MESSAGES',
			};
		}

		if (messages.length === 0) {
			return {
				type: 'success',
				status: 200,
				message: 'No messages found',
				data: [],
				uniqueCode: 'NO_MESSAGES_FOUND',
			};
		}

		return {
			type: 'success',
			status: 200,
			message: 'Messages loaded successfully',
			data: messages,
			uniqueCode: 'MESSAGES_LOADED_SUCCESSFULLY',
		};
	} catch (err) {
		console.log(err);
		return {
			type: 'error',
			status: 500,
			message: 'Internal server error',
			data: null,
			uniqueCode: 'INTERNAL_SERVER_ERROR',
		};
	}
};

module.exports = {
	createMessage,
	loadMessages,
};
