const EmsUser = require('../models/EmsUser');
const jwt = require('jsonwebtoken');
const configs = require('../configs');
const bcrypt = require('bcrypt');

const authController = {};

authController.signup = function (req, res, next) {
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
						if (err) {
							return res.status(500).json({ error: error });
						}
						res.status(200).json({
							user: result
						});
					});
				})
				.catch(error => res.status(500).json({ error: error }));
		} else {
			res.status(400).json({ error: 'Email has been used' })
		}
	})
}

authController.login = function (req, res) {
	EmsUser.findOne(
		{ username: req.body.username },
		function (err, user) {
			if (err) {
				res.status(500).json({
					error: error
				});
			}
			if (!user) {
				return res.status(404).json({ err: 'Username and Password are incorrect' })
			}
			bcrypt.compare(req.body.password, user.password, (err, result) => {
				if (err) {
					return res.status(401).json({
						failed: 'Unauthorized Access'
					});
				}
				if (result) {
					const JWTToken = jwt.sign(
						{
							email: user.email,
							_id: user._id
						},
						configs.secret.SESSION_SECRET
						,
						{
							expiresIn: 86400
						}
					);
					return res.status(200).json({
						success: 'Login success!',
						user: {
							username: user.username,
							firstName: user.firstName,
							lastName: user.lastName,
							role: user.role,
							isLocked: user.isLocked
						},
						token: JWTToken
					})
				}
				return res.status(401).json({
					failed: 'Unauthorized Access'
				});
			})
		})
}

authController.logout = function (req, res) {
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

module.exports = authController;