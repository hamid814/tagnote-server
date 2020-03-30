const express = require('express')
let tags = require('../db/tags.js')
const shortid = require('shortid')
const {
  getTags,
  getTag,
  searchTags,
  createTag,
  deleteTag,
  updateTag
} = require('../controllers/tags')

const router = express.Router()

// @route    GET /tags/search
// @desc     search tegs
// router.get('/search', (req, res) => {
//   const filtered = tags.filter(tag => {
//     return tag.name.indexOf(req.query.text) !== -1
//   })

//   res.send(filtered)
// })

router
  .route('/')
  .get(getTags)
  .post(createTag)

router
  .route('/search')
  .get(searchTags)

router
  .route('/:id')
  .get(getTag)
  .delete(deleteTag)
  .put(updateTag)
  


module.exports = router;