// js modules
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
const morgan = require('morgan')
//my files
const tags = require('./db/tags.js')
const notes = require('./db/notes.js')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/errorHandler')

// Test files and be deleted after development
const logger = require('./middleware/logger')

// Initialize express
const app = express()

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect DataBase
connectDB();

// Body parser
app.use(express.json({ extended: false }))

// dev logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// for testing and development purpeses Only
if (process.env.NODE_ENV === 'development') {
  app.use(logger);
}

// add static files
app.use(express.static('public'))

// Routes
app.use('/api/v1/tags', require('./routes/tags'));
app.use('/api/v1/notes', require('./routes/notes'))
app.use('/colors', require('./routes/colors'))
app.use('/test', require('./routes/test'))

// use custom error handler
app.use(errorHandler)

// My personal ntoes
const works = [
  'add controllers to client-side',
  'search for tags route',
  'note model is incomplete',
  'note update route is incompelete',
  'is tag description required?'
]

// Log my personal Notes
works.length > 0
  ? works.forEach(w => console.log(w.brightMagenta))
  : console.log('works done'.green.inverse)

const PORT = process.env.PORT || 5000

// Listen to port and log it
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.gray.underline
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});