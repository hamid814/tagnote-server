const express = require('express')
const colors = require('colors')
const tags = require('./db/tags.js')
const notes = require('./db/notes.js')

const app = express()

app.use(express.json({ extended: false }))
app.use(express.static('public'))

// Routes
app.use('/tags', require('./routes/tags'));
app.use('/notes', require('./routes/notes'))
app.use('/colors', require('./routes/colors'))
app.use('/test', require('./routes/test'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server running on port ${PORT}`.cyan.inverse))