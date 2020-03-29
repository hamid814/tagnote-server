const Note = require('../models/Note');

// @route    GET /api/v1/notes
// @desc     get all notes
exports.getNotes = async (req, res, next) => {
  const notes = await Note.find()

  res.status(200).json({
    success: true,
    count: notes.length,
    data: notes
  })
}

// @route     GET /api/v1/notes/:id
// @desc      Get a single note
exports.getNote = async (req, res, next) => {
  const note = await Note.findById(req.params.id)

  res.status(200).json({
    success: true,
    data: note
  })
}

// @route      POST /api/v1/notes 
// @desc       add a note
exports.addNote = async (req, res, next) => {
  const note = await Note.create(req.body)

  res.status(201).json({
    success: true,
    data: note
  })
}

// @route      PUT /api/v1/note/:id
// @desc       edit a specific note
exports.editNote = async (req, res, next) => {
  const note = await Note.findById(req.params.id)

  res.send(`update note with id ${req.params.id}`)
}

// @route      DELETE /api/v1/note/:id
// @desc       delete a specific note
exports.deleteNote = async (req, res, next) => {
  const note = await Note.findById(req.params.id)

  note.remove()

  res.status(200).json({
    success: true,
    data: {}
  })
}
