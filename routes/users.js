const express = require('express');
const { onlyAdmin } = require('../middleware/auth');
const {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} = require('../controllers/users');

const router = express.Router();

router.get('/', onlyAdmin, getUsers);
router.get('/:id', onlyAdmin, getUser);
router.put('/:id', onlyAdmin, updateUser);
router.delete('/:id', onlyAdmin, deleteUser);

module.exports = router;
