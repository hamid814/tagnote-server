const express = require('express');
const Note = require('../models/Note');
const { protect, loadUser } = require('../middleware/auth');
const noteAdvancedResults = require('../middleware/noteAdvancedResults');
const {
  getNotes,
  getNote,
  addNote,
  editNote,
  deleteNote,
  deleteMany,
  getTokenForNote,
  getNoteWithToken,
} = require('../controllers/notes');
const router = express.Router();

router
  .route('/')
  .get(
    [
      loadUser,
      noteAdvancedResults(Note, {
        populate: [
          JSON.parse(process.env.TAG_POPULATE),
          JSON.parse(process.env.OTHER_TAGS_POPULATE),
        ],
        user: 'user/guest',
      }),
    ],
    getNotes
  )
  .post(loadUser, addNote);

router.route('/deletemany').delete(protect, deleteMany);

router.get('/view', getNoteWithToken);

router
  .route('/:id')
  .get(getNote)
  .put(protect, editNote)
  .delete(protect, deleteNote);

router.get('/:id/token', protect, getTokenForNote);

module.exports = router;
