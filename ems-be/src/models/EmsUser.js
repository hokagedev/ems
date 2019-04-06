const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emsUserSchema = new Schema(
	{
		username: { type: String, required: true, trim: true, minlength: 2 },
		password: { type: String, required: true, trim: true, minlength: 6 },
		password_confirm: { type: String, required: true, trim: true, minlength: 6 },
		role: { type: String, enum: ['admin', 'customer'] },
		email: { type: String, unique: true, required: true, trim: true },
		firstName: { type: String, minlength: 2 },
		lastName: { type: String, minlength: 2 },
		gender: { type: String, enum: ['Male', 'Female', 'Other'] },
		phone: { type: String, minlength: 9 },
		isLocked: { type: Boolean },
		creator: { type: String },
		created: { type: Date },
		modifier: { type: String },
		modified: { type: Date },
	},
	{ collection: 'ems-user' }
);

module.exports = mongoose.model('EmsUser', emsUserSchema)