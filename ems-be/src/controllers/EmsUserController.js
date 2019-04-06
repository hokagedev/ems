const EmsUser = require('../models/EmsUser');
const bcrypt = require('bcrypt');

exports.register = function (req, res, next) {
	EmsUser.findOne({ email: req.body.email }, (err, emsUser) => {
		if (emsUser == null) {
			bcrypt
				.hash(req.body.password, 10)
				.then(hash => {
					const user = new EmsUser(req.body);
					user.role = ['customer'];
					user.password = hash;
					user.password_confirm = hash;
					user.save((err, result) => {
						if (err) { return res.json({ err }) }
						res.json({ user: result })
					});
				}).catch(error => {
					return next(error);
				});
		} else {
			res.json({ err: 'Email has been used' })
		}
	})
}

exports.login = function (req, res) {
	EmsUser.findOne({ username: req.body.username }).exec(function (err, user) {
		if (err) {
			return res.json({ err })
		} else if (!user) {
			return res.json({ err: 'Username and Password are incorrect' })
		}
		bcrypt.compare(req.body.password, user.password, (err, result) => {
			if (result === true) {
				console.log(req.session)
				req.session.user = user;
				res.json({
					user: {
						username: user.username,
						firstName: user.firstName,
						lastName: user.lastName,
						role: user.role,
						isLocked: user.isLocked
					},
					message: 'Login success!',
					expires_in: 24*60*60
				})
			} else {
				return res.json({ err: 'Username and Password are incorrect!' })
			}
		})
	})
}

exports.logout = function (req, res) {
	if (req.session) {
		req.session.destroy(function (err) {
			if (err) {
				return res.json({ err });
			} else {
				return res.json({ 'message': "Logout success!" });
			}
		});
	}
}

exports.getUsers = function (req, res) {
	const cols = '_id username email role firstName lastName gender phone isUserAdmin isLocked'
	EmsUser.find({}, cols, (err, users) => {
		if (err) { return res.json({ err }) }
		res.json({ users: users })
	})
}

exports.getUserById = function (req, res) {
	EmsUser.findOne({ _id: req.params.id }).exec(function (err, user) {
		if (err) { return res.json({ err }) }
		res.json({
			user: user
		})
	})
}

exports.updateUser = function (req, res) {
	EmsUser.findById(req.params.id, (err, user) => {
		if (err) { return res.json({ err }) }
		user.username = req.body.user.username;
		user.save().then(result => {
			res.json({ user: result })
		});
	})
}

exports.deleteUser = function (req, res) {
	EmsUser.remove({ _id: req.params.id }, (err) => {
		if (err) { return res.json({ err }) }
		res.json({ 'mess': 'Delete success' })
	})
}
