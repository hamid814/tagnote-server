const Tag = require('../models/Tag');
const Note = require('../models/Note');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @route     GET /api/v1/tags
// @desc      get all tags
exports.getTags = asyncHandler(async (req, res, next) => {
  let query;

  query = Tag.find();

  if (req.query.find) {
    query = Tag.find({ name: { $regex: req.query.find } });
  }

  const tags = await query;

  res.send({
    success: true,
    count: tags.length,
    data: tags,
  });
});

// @route     GET /api/v1/tags/:id
// @desc      get a single tag with id
exports.getTag = asyncHandler(async (req, res, next) => {
  const tag = await Tag.findById(req.params.id);

  if (!tag) {
    return next(new ErrorResponse(`No tag with id ${req.params.id}`, 404));
  }

  res.send({
    success: true,
    data: tag,
  });
});

// @route     GET /api/v1/tags/:slug/notes
// @desc      get a single tag and its notes
exports.getTagAndNotes = asyncHandler(async (req, res, next) => {
  const tag = await Tag.findOne({ slug: req.params.slug });

  if (!tag) {
    return next(new ErrorResponse('tag not found', 404));
  }

  const notes = await Note.find({ tag: tag._id })
    .populate({
      path: 'tag',
      select: 'name color slug',
    })
    .populate({
      path: 'otherTags',
      select: 'name color slug',
    });
  const otherNotes = await Note.find({
    otherTags: { $in: [tag._id] },
  })
    .populate({
      path: 'tag',
      select: 'name color slug',
    })
    .populate({
      path: 'otherTags',
      select: 'name color slug',
    });

  res.status(200).json({
    success: true,
    data: {
      tag,
      notes,
      otherNotes,
    },
  });
});

// @route     POST /api/v1/tags
// @desc      create a new tag
exports.createTag = asyncHandler(async (req, res, next) => {
  const tag = await Tag.create(req.body);

  res.status(201).json({
    success: true,
    data: tag,
  });
});

// @route     DELETE /api/v1/tags/id/:id
// @desc      delete a tag
exports.deleteTag = asyncHandler(async (req, res, next) => {
  const tag = await Tag.findById(req.params.id);

  if (!tag) {
    return next(new ErrorResponse(`No tag with id ${req.params.id}`, 404));
  }

  tag.remove();

  res.status(200).json({ success: true, data: {} });
});

// @route     PUT /api/v1/tags/:id
// desc       pudate a tag
exports.updateTag = asyncHandler(async (req, res, next) => {
  res.send('update tag');
});
