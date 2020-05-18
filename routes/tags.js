const express = require('express');
let tags = require('../db/tags.js');
const shortid = require('shortid');
const {
  getTags,
  getTag,
  createTag,
  deleteTag,
  updateTag,
  getTagAndNotes,
} = require('../controllers/tags');

const router = express.Router();

router.route('/').get(getTags).post(createTag);

router.route('/:id').get(getTag).delete(deleteTag).put(updateTag);

router.route('/:tagId/notes').get(getTagAndNotes);

module.exports = router;
