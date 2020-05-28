const express = require('express');
const Note = require('../models/Note');
const { protect, checkUser } = require('../middleware/auth');
const { beforeAdd } = require('../middleware/notes');
const advancedResults = require('../middleware/advancedResults');
const {
  getNotes,
  getNote,
  addNote,
  editNote,
  deleteNote,
  deleteMany,
} = require('../controllers/notes');
const router = express.Router();

router
  .route('/')
  .get(
    advancedResults(Note, [
      JSON.parse(process.env.TAG_POPULATE),
      JSON.parse(process.env.OTHER_TAGS_POPULATE),
    ]),
    getNotes
  )
  .post([beforeAdd, checkUser], addNote);

router.route('/deletemany').delete(protect, deleteMany);

router
  .route('/:id')
  .get(getNote)
  .put(protect, editNote)
  .delete(protect, deleteNote);

module.exports = router;
