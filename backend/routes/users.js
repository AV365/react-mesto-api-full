const express = require('express');

const router = express.Router();
const controller = require('../controllers/users');




router.get('/', controller.getUsers);
router.get('/:id', controller.getUser);


router.patch('/me', controller.updateUserProfile);
router.patch('/me/avatar', controller.updateUserAvatar);

module.exports = router;
