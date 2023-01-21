const mongoose = require('mongoose');
const { Schema } = mongoose;

// schema for reactions to messages given by users in the group.
const reactionSchema = new Schema({
	reactionType: {
		type: String,
		values: ['like', 'love', 'haha', 'wow', 'sad', 'angry'],
		required: true,
		trim: true,
	},
	reactionSender: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

const messageSchema = new Schema(
	{
		messageText: {
			type: String,
			required: true,
			trim: true,
		},
		messageSender: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		// Group to which the message belongs
		messageGroupId: {
			type: Schema.Types.ObjectId,
			ref: 'Group',
			required: true,
		},
		// reactions to the message given by users in the group.
		// reactions are generally very few, so we can store them in the same document as the message. Could be shifted to other document in the future if the number of reactions increases.
		messageReactions: {
			type: [reactionSchema],
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Message', messageSchema);
