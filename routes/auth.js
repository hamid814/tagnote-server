const express = require('express');
const { protect } = require('../middleware/auth');
const { getMe, login, register } = require('../controllers/auth.js');

const router = express.Router();

router.get('/me', protect, getMe);
router.post('/login', login);
router.post('/register', register);

module.exports = router;
