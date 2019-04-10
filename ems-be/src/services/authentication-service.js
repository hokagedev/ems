const configs = require('../configs');
const jwt = require('jsonwebtoken');

const authService = {};

authService.requiresLogout = function (req, res, next) {
	var token = req.body.token || req.params.token || req.headers['authorization'];
	if (token) {
		jwt.verify(token, configs.secret.SESSION_SECRET, function (err, decoded) {
			if (err) {
				return next();
			} else {
				return res.status(400).json({success: false, message: 'You are already logged in. Please sign out!'})
			}
		});
	} else {
		return next();
	}
}

authService.requiresLogin = function (req, res, next) {
	console.log(req.headers)
	var token = req.body.token || req.params.token || req.headers['authorization'];
	if (token) {
		jwt.verify(token, configs.secret.SESSION_SECRET, function (err, decoded) {
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.status(403).json({
			success: false,
			message: 'Access Denied'
		});
	}
}

module.exports = authService;