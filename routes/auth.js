const express = require('express');
const { getMe, login, register } = require('../controllers/auth.js');

const router = express.Router();

router.get('/me', getMe);
router.post('/login', login);
router.post('/register', register);

module.exports = router;
