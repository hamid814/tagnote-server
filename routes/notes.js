const express = require('express');
const { protect, checkUser } = require('../middleware/auth');
const {
  getNotes,
  getNote,
  addNote,
  editNote,
  deleteNote,
  deleteMany,
} = require('../controllers/notes');
const router = express.Router();

router.route('/').get(getNotes).post(checkUser, addNote);

router.route('/deletemany').delete(protect, deleteMany);

router
  .route('/:id')
  .get(getNote)
  .put(protect, editNote)
  .delete(protect, deleteNote);

module.exports = router;
