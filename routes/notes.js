const express = require('express');
let notes = require('../db/notes');
const shortid = require('shortid');
const {
  getNotes,
  getNote,
  addNote,
  editNote,
  deleteNote,
} = require('../controllers/notes');
const router = express.Router();

router.route('/').get(getNotes).post(addNote);

router.route('/:id').get(getNote).put(editNote).delete(protect, deleteNote);

module.exports = router;
