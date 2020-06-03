const Note = require('../models/Note');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');

// @route    GET /api/v1/notes
// @desc     get all notes
exports.getNotes = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @route     GET /api/v1/notes/:id
// @desc      Get a single note
exports.getNote = asyncHandler(async (req, res, next) => {
  const note = await Note.findById(req.params.id)
    .populate(JSON.parse(process.env.TAG_POPULATE))
    .populate(JSON.parse(process.env.OTHER_TAGS_POPULATE));

  if (!note) {
    return next(new ErrorResponse(`No note with id ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: note,
  });
});

// @route      POST /api/v1/notes
// @desc       add a note
exports.addNote = asyncHandler(async (req, res, next) => {
  if (req.user === 'guest') {
    req.body.byGuest = true;
  } else {
    req.body.byGuest = false;
    req.body.user = req.user._id;
  }

  const newNote = await Note.create(req.body);

  const note = await Note.findById(newNote._id)
    .populate(JSON.parse(process.env.TAG_POPULATE))
    .populate(JSON.parse(process.env.OTHER_TAGS_POPULATE));

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
    return next(new ErrorResponse('Note not found', 404));
  }

  delete req.body._id;

  note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate(JSON.parse(process.env.TAG_POPULATE))
    .populate(JSON.parse(process.env.OTHER_TAGS_POPULATE));

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
    return next(new ErrorResponse(`No note with id of ${req.params.id}`, 404));
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
    data: [...req.body.ids],
  });
});

// @route      GET /api/v1/notes/:id/token
// @desc       get a Token for a note to share it
// acccess     Private
exports.getTokenForNote = asyncHandler(async (req, res, next) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return next(new ErrorResponse("Note deosn't exits", 404));
  }

  if (note.user === 'guset') {
    return next(new ErrorResponse('Note is public', 400));
  }

  if (String(req.user._id) !== String(note.user)) {
    return next(
      new ErrorResponse("You're not allowed to acces this Note", 403)
    );
  }

  const token = jwt.sign({ noteId: note._id }, process.env.JWT_SECRET);

  res.status(200).json({
    success: true,
    token,
  });
});

// @route      GET /api/v1/notes/view?token="token"
// @desc       view a note with a token
// acccess     Public
exports.getNoteWithToken = asyncHandler(async (req, res, next) => {
  console.log(req.url);

  if (!req.query.token) {
    return next(new ErrorResponse('no token provided', 400));
  }

  try {
    const decoded = await jwt.verify(req.query.token, process.env.JWT_SECRET);

    const note = await Note.findById(decoded.noteId)
      .populate({
        ...JSON.parse(process.env.TAG_POPULATE),
        select: 'name color -_id',
      })
      .populate(JSON.parse(process.env.OTHER_TAGS_POPULATE))
      .populate({ path: 'user', select: 'name -_id' })
      .select('-isPersonal -byGuest -_id');

    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (err) {
    return next(new ErrorResponse('Error', 500));
  }
});
