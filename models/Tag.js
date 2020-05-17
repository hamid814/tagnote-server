const mongoose = require('mongoose');
const slugify = require('slugify');

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Add name to your Tag'],
    unique: [true, 'Tag in already in the database'],
    maxlength: [52, 'Name connot be longer than 52'],
  },
  slug: String,
  description: {
    type: String,
    maxlength: [500, 'Description can not be more than 500 characters'],
  },
  color: {
    type: String,
    default: '#6c96',
  },
});

// Create tag slug from the name
TagSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Tag', TagSchema);
