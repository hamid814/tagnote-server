const Note = require('../models/Note');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResposne = require('../utils/errorResponse');

// @route    GET /api/v1/notes
// @desc     get all notes
exports.getNotes = asyncHandler(async (req, res, next) => {
  const tagPopulate = {
    path: 'tag',
    select: 'name color',
  };

  const otherTagsPopulate = {
    path: 'otherTags',
    select: 'name color',
  };

  const notes = await Note.find()
    .populate(tagPopulate)
    .populate(otherTagsPopulate);

  res.status(200).json({
    success: true,
    count: notes.length,
    data: notes,
  });
});

// @route     GET /api/v1/notes/:id
// @desc      Get a single note
exports.getNote = asyncHandler(async (req, res, next) => {
  const tagPopulate = {
    path: 'tag',
    select: 'name color',
  };

  const otherTagsPopulate = {
    path: 'otherTags',
    select: 'name color',
  };

  const note = await Note.findById(req.params.id)
    .populate(tagPopulate)
    .populate(otherTagsPopulate);

  if (!note) {
    return next(new ErrorResposne(`No note with id ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: note,
  });
});

// @route      POST /api/v1/notes
// @desc       add a note
exports.addNote = asyncHandler(async (req, res, next) => {
  const tagPopulate = {
    path: 'tag',
    select: 'name color',
  };

  const otherTagsPopulate = {
    path: 'otherTags',
    select: 'name color',
  };

  const newNote = await Note.create(req.body);

  const note = await Note.findById(newNote._id)
    .populate(tagPopulate)
    .populate(otherTagsPopulate);

  res.status(201).json({
    success: true,
    data: note,
  });
});

// @route      PUT /api/v1/notes/:id
// @desc       edit a specific note
exports.editNote = asyncHandler(async (req, res, next) => {
  let note = await Note.findById(req.params.id);

  if (!note) {
    return next(new ErrorResposne('Note not found', 404));
  }

  delete req.body._id;

  note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate({
      path: 'tag',
      select: 'name color',
    })
    .populate({
      path: 'otherTags',
      select: 'name color',
    });

  res.status(200).json({
    success: true,
    data: note,
  });
});

// @route      DELETE /api/v1/notes/:id
// @desc       delete a specific note
exports.deleteNote = asyncHandler(async (req, res, next) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return next(new ErrorResposne(`No note with id of ${req.params.id}`, 404));
  }

  note.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @route      DELETE /api/v1/notes/deletemany
// @desc       delete many notes with id
exports.deleteMany = asyncHandler(async (req, res, next) => {
  await Note.deleteMany({ _id: [...req.body.ids] });

  res.status(200).json({
    success: true,
    data: {},
  });
});
