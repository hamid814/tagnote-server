const express = require('express');
const { protect } = require('../middleware/auth');
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

router
  .route('/:id')
  .get(getTag)
  .delete(protect, deleteTag)
  .put(protect, updateTag);

router.route('/:slug/notes').get(getTagAndNotes);

module.exports = router;
