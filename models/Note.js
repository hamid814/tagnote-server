const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
  body: {
    type: String,
    required: [true, 'Please Enter a text']
  },
  tags: {
    type: Object,
    primary: String,
    other: [String]
  }
})

module.exports = mongoose.model('Note', NoteSchema)