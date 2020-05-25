const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  body: {
    type: String,
    required: [true, 'Please Enter a body text'],
    unique: false,
  },
  tag: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tag',
    required: [true, 'please add a tag to your note'],
  },
  otherTags: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Tag',
    },
  ],
  date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('Note', NoteSchema);
