const express = require('express');

const router = express.Router();
const { register, login, logout, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/EmsUserController');
const { EmsUserValidator } = require('../validators/validator');

router.post('/register', EmsUserValidator, register);

function requiresLogout(req, res, next) {
	if (req.session && req.session.user) {
		return res.json({ err: 'You must be Logout in to Login continue' });
	} else {
		return next();
	}
}
router.post('/login', requiresLogout, login);

function requiresLogin(req, res, next) {
	if (req.session && req.session.user) {
		return next();
	} else {
		return res.json({ err: 'You must be logged in to view this page.' });
	}
}

router.get('/logout', requiresLogin, logout);

// router.get('/users', requiresLogin, getUsers);
router.get('/users', getUsers);
router.get('/users/:id', requiresLogin, getUserById);
router.put('/users/:id', requiresLogin, updateUser);
router.delete('/users/:id', requiresLogin, deleteUser);

module.exports = router;