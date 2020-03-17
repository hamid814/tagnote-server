const express = require('express')
let notes = require('../db/notes')
const shortid = require('shortid')

const router = express.Router()

// @route    GET /notes 
// @desc     get all notes
router.get('/', (req, res) => {
  res.send(notes)
})

// @route    GET /notes/id/:id
// @desc     get single note with id
router.get('/id/:id', (req, res) => {
  const note = notes.filter(note => note.id === req.params.id)
  
  if(note.length === 1) {
    res.send(note[0])
  } else if(note.length === 0) {
    res.status(404).send({
      msg: 'tag not found'
    })
  } else {
    res.status(500).send({
      msg: 'internal server error'
    })
  }
})

// @route     GET /notes/tag/:tagid
// @desc      get notes with a special tag
router.get('/tag/:tagid', (req, res) => {
  const primaryList = notes.filter(note => note.tags.primary === req.params.tagid)
  
  const otherList = notes.filter(note => note.tags.other.indexOf(req.params.tagid) !== -1)

  const list = {
    primaryList,
    otherList
  }
  
  res.send(list)
})

// @route     POST /notes
// @desc      add new note
router.post('/', (req, res) => {
  const newNote = req.body

  newNote.id = shortid.generate()
  
  notes = [...notes, newNote]
  
  res.send(req.body)
})

module.exports = router