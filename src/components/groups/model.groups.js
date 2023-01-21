const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupSchema = new Schema(
	{
		groupName: {
			type: String,
			required: true,
			maxlength: 50,
			trim: true,
		},
		groupDescription: {
			type: String,
			required: true,
			maxlength: 500,
			trim: true,
		},
		groupAdmins: {
			// when a new group is created, the creator of the group should be added to the groupAdmins and groupMembers.
			type: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
			required: true,
		},
		groupMembers: {
			// groupMembers should also contain the groupAdmins. so when we add a new groupAdmin, we should also add him to the groupMembers if he is not already there.
			type: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Group', groupSchema);
