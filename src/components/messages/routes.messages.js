const router = require('express').Router();

const {
	createMessageController,
	loadMessagesController,
} = require('./controller.messages');

router.post('/create', createMessageController);
router.get('/load/:groupId/:page/:limit', loadMessagesController);

module.exports = router;
