const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
  body: {
    type: String,
    required: [true, 'Please Enter a body text']
  },
  tag: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tag',
    required: true
  },
  otherTags: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Tag'
  }]
})

module.exports = mongoose.model('Note', NoteSchema)