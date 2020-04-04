const Note = require('../models/Note');
const asyncHandler = require('../middleware/asyncHandler')
const ErrorResposne = require('../utils/errorResponse')

// @route    GET /api/v1/notes
// @desc     get all notes
exports.getNotes = asyncHandler(async (req, res, next) => {
  const notes = await Note.find().populate('tag');

  res.status(200).json({
    success: true,
    count: notes.length,
    data: notes
  });
});

// @route     GET /api/v1/notes/:id
// @desc      Get a single note
exports.getNote = asyncHandler(async (req, res, next) => {
  const note = await Note.findById(req.params.id).populate({
    path: 'tag',
    select: 'name color'
  });

  if(!note) {
    return next(
      new ErrorResposne(`No note with id ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: note
  });
});

// @route      POST /api/v1/notes 
// @desc       add a note
exports.addNote = asyncHandler(async (req, res, next) => {
  const note = await Note.create(req.body);

  res.status(201).json({
    success: true,
    data: note
  });
});

// @route      PUT /api/v1/note/:id
// @desc       edit a specific note
exports.editNote = asyncHandler(async (req, res, next) => {
  const note = await Note.findById(req.params.id);

  res.send(`update note with id ${req.params.id}`);
});

// @route      DELETE /api/v1/note/:id
// @desc       delete a specific note
exports.deleteNote = asyncHandler(async (req, res, next) => {
  const note = await Note.findById(req.params.id);

  if(!note) {
    return next(
      new ErrorResposne(`No note with id of ${req.params.id}`, 404)
    )
  }

  note.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
