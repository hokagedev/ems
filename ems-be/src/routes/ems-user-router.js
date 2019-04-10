const emsUserRouter = require('express').Router();
const emsUserController = require('../controllers/ems-user-controller');
const emsUserValidator = require('../validators/ems-user-validator');
const authenService = require('../services/authentication-service');

emsUserRouter.use(authenService.requiresLogin);
emsUserRouter.get('/api/v1/users', emsUserController.getUsers);
emsUserRouter.get('/api/v1/users/:id', emsUserController.getUserById);
emsUserRouter.put('/api/v1/users/:id', emsUserController.updateUser);
emsUserRouter.delete('/api/v1/users/:id', emsUserController.deleteUser);

module.exports = emsUserRouter;