const mongoose = require('mongoose');
const { Schema } = mongoose;

// using groupInfoSchema in userSchema because users can only join limited groups, so the document size wont exceed the 16MB limit.
const groupInfoSchema = new Schema({
	groupId: {
		type: Schema.Types.ObjectId,
		ref: 'Group',
		required: true,
	},
	groupJoinDate: {
		type: Date,
	},
	groupLeaveDate: {
		type: Date,
	},
});

const userSchema = new Schema(
	{
		whatsAppName: {
			type: String,
			required: true,
			trim: true,
		},
		whatsAppNumber: {
			type: String,
			required: true,
			trim: true,
		},
		whatsAppNumberCountryCode: {
			// this is the country code of the whatsAppNumber. eg: 91 for India. Don't include + sign.
			type: String,
			required: true,
			trim: true,
		},
		whatsAppAbout: {
			// this is the about section of the user in whatsApp.
			type: String,
			required: true,
			trim: true,
			maxlength: 128,
		},
		whatsAppGroups: {
			type: [groupInfoSchema],
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('User', userSchema);
