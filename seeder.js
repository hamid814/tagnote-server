const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Tag = require('./models/Tag');
const Note = require('./models/Note');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Read fade database files
const tags = require('./db/tags');
const notes = require('./db/notes');

// Import into DB
const importData = async (text) => {
  const notesWithNewBody = notes.map((note) => ({
    ...note,
    body: text + ' ' + note.body,
  }));

  try {
    // await Tag.create(tags);
    await Note.create(notesWithNewBody);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    // await Tag.deleteMany();
    await Note.deleteMany();
    // await User.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData(process.argv[3]);
} else if (process.argv[2] === '-d') {
  deleteData();
}
