const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
  body: {
    type: String,
    required: [true, 'Please Enter a body text']
  },
  tags: {
    type: Object,
    primary: {
      type: String,
      reqired: [true, 'note must have a primary tag']
    },
    other: [String]
  }
})

module.exports = mongoose.model('Note', NoteSchema)