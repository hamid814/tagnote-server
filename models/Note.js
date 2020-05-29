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
  byGuest: Boolean,
  isPersonal: Boolean,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

NoteSchema.pre('save', async function (next, req, callback) {
  console.log(this);
});

module.exports = mongoose.model('Note', NoteSchema);
