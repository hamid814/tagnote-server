const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getNotes,
  getNote,
  addNote,
  editNote,
  deleteNote,
  deleteMany,
} = require('../controllers/notes');
const router = express.Router();

router.route('/').get(getNotes).post(addNote);

router.route('/deletemany').delete(deleteMany);

router
  .route('/:id')
  .get(getNote)
  .put(protect, editNote)
  .delete(protect, deleteNote);

module.exports = router;
