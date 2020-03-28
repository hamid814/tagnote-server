const express = require('express')
const colors = require('colors')
const tags = require('./db/tags.js')
const notes = require('./db/notes.js')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

// Initialize express
const app = express()

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect DataBase
connectDB();

// Body parser
app.use(express.json({ extended: false }))

// add static files
app.use(express.static('public'))

// Routes
app.use('/api/v1/tags', require('./routes/tags'));
app.use('/notes', require('./routes/notes'))
app.use('/colors', require('./routes/colors'))
app.use('/test', require('./routes/test'))

const works = [
  'add /api to all routes',
  'add controllers to client-side',
  'correct routes endpoints',
  'search for tags route'
]

works.length > 0
  ? works.forEach(w => console.log(w.brightMagenta))
  : console.log('works done'.green.inverse)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server running on port ${PORT}`.cyan.inverse))