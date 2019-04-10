const emsUserController = {};
const EmsUser = require('../models/EmsUser');

emsUserController.getUsers = function (req, res) {
	const cols = '_id username email role firstName lastName gender phone isUserAdmin isLocked'
	EmsUser.find({}, cols, (err, users) => {
		if (err) { return res.json({ err }) }
		res.json({ users: users })
	})
}

emsUserController.getUserById = function (req, res) {
	EmsUser.findOne({ _id: req.params.id }).exec(function (err, user) {
		if (err) { return res.json({ err }) }
		res.json({
			user: user
		})
	})
}

emsUserController.updateUser = function (req, res) {
	EmsUser.findById(req.params.id, (err, user) => {
		if (err) { return res.json({ err }) }
		user.username = req.body.user.username;
		user.save().then(result => {
			res.json({ user: result })
		});
	})
}

emsUserController.deleteUser = function (req, res) {
	EmsUser.remove({ _id: req.params.id }, (err) => {
		if (err) { return res.json({ err }) }
		res.json({ 'mess': 'Delete success' })
	})
}

module.exports = emsUserController;