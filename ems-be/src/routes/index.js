var router = require('express').Router();

// router.use(require('./home'));
router.use(require('./auth-router'));
router.use(require('./ems-user-router'));

module.exports = router;