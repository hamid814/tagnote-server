// Node modules
const fs = require('fs');
const path = require('path');

// Js modules
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');

// My files
const tags = require('./db/tags.js');
const notes = require('./db/notes.js');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Test files and be deleted after development
const logger = require('./middleware/logger');

// Initialize express
const app = express();

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect DataBase
connectDB();

// Body parser
app.use(express.json({ extended: false }));

// dev logger
if (process.env.NODE_ENV === 'development') {
  app.use(
    morgan('dev', {
      skip: function (req, res) {
        return req.url == '/favicon.ico';
      },
    })
  );
}

// Create a write stream (in append mode) ( for logging reqs )
let logFiles;

if (process.env.NODE_ENV === 'development') {
  var logsFile = fs.createWriteStream(
    path.join(__dirname, 'logs', 'reqHistory.txt'),
    { flags: 'a' }
  );
}

// Setup a logger for all reqs
if (process.env.NODE_ENV === 'development') {
  app.use(
    morgan(process.env.LOG_PATTERN, {
      stream: logsFile,
      skip: function (req, res) {
        return req.url == '/favicon.ico';
      },
    })
  );
}

// logger for testings
app.use(logger);

// Routes
app.use('/api/v1/tags', require('./routes/tags'));
app.use('/api/v1/notes', require('./routes/notes'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/colors', require('./routes/colors'));
app.use('/test', require('./routes/test'));

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// use custom error handler
app.use(errorHandler);

// My personal ntoes
const works = [
  'add controllers to client-side',
  'note model is incomplete',
  'note update route is incompelete',
  'is tag description required?',
  'add populate to note create',
  'add note ot top of the list in mongodb',
  'in errorHandler must send an array of messages always to control it on the frons easily (in errorRespose it must be conrolled i think)',
  'delete note must not delet it forever, it must be added to deleted collection ( and to bringing back in possible! )',
  'advancedresults doesnt contain req.query',
  '*** important: *** change tag slug before update',
  '*** important: *** if added tag sub, add populate sub in returning updated tag',
  'update and delete user is not avalable to the user ( onlyAdmin can do it, actually i must say there is no page that user can control its account )',
];

// Log my personal Notes
works.length > 0
  ? works.forEach((w) => console.log(`note:  ${w}  /`.cyan))
  : console.log('works done'.green.inverse);

const PORT = process.env.PORT || 5000;

// Listen to port and log it
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.gray
      .underline
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
