const Tag = require('../models/Tag')

// @route     GET /api/v1/tags
// @desc      get all tags
exports.getTags = async (req, res, next) => {
  const tags = await Tag.find();

  res.send({
    success: true,
    count: tags.length,
    data: tags
  })
}

// @route     GET /api/v1/tags/id/:id
// @desc      get all tags
exports.getTag = async (req, res, next) => {
  const tags = await Tag.findById(req.params.id);

  res.send({
    success: true,
    count: tags.length,
    data: tags
  })
}

// @route    GET /api/v1/tags/search
// @desc     search in tags
exports.searchTags = (req, res, next) => {
  res.send('search in tags')
}

// @route     POST /api/v1/tags
// @desc      create a new tag
exports.createTag = async (req, res, next) => {
  const tag = await Tag.create(req.body);

  res.status(201).json({
    success: true,
    data: tag
  })
}

// @route     DELETE /api/v1/tags/id/:id
// @desc      delete a tag
exports.deleteTag = async (req, res, next) => {
  const tag = await Tag.findById(req.params.id);

  tag.remove()

  res.status(200).json({ success: true, data: {} });
}

// @route     PUT /api/v1/tags/:id
// desc       pudate a tag
exports.updateTag = (req, res, next) => {
  res.send('update tag')
}

/*

  get all tags
  gat single tag
  delete tag
  add tag
  edit tag
  search tags

*/