const express = require('express');
let tags = require('../db/tags.js');
const shortid = require('shortid');
const {
  getTags,
  getTag,
  createTag,
  deleteTag,
  updateTag,
} = require('../controllers/tags');

const router = express.Router();

router.route('/').get(getTags).post(createTag);

router.route('/:id').get(getTag).delete(deleteTag).put(updateTag);

module.exports = router;
