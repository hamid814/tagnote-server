const express = require('express')
let tags = require('../db/tags.js')
const shortid = require('shortid')

const router = express.Router()

// @route    GET /tags
// @desc     get all tags
router.get('/', (req, res) => {
  res.send(tags)
})

// @route    GET /tags/search
// @desc     search tegs
router.get('/search', (req, res) => {
  const filtered = tags.filter(tag => {
    return tag.name.indexOf(req.query.text) !== -1
  })

  res.send(filtered)
})

// @route    GET /tags/id/:id
// @desc     get single tag by id
router.get('/id/:id', (req, res) => {
  const tag = tags.filter(tag => tag.id === req.params.id)
  
  if(tag.length === 1) {
    res.send(tag[0])
  } else if(tag.length === 0) {
    res.status(404).send({
      msg: 'tag not found'
    })
  } else {
    res.status(500).send({
      msg: 'internal server error'
    })
  }
})

// @route    POST /tags
// @desc     add new tag
router.post('/', (req, res) => {
  const newTag = req.body

  newTag.id = shortid.generate()
  newTag.color = '#8886'

  tags = [...tags, newTag]
  
  res.send(newTag)
})

module.exports = router;