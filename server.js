const express = require('express')
const colors = require('colors')
const tags = require('./db/tags.js')
const notes = require('./db/notes.js')

const app = express()

app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('hashnote api v.1')
  res.sendfi
})

app.get('/tags', (req, res) => {
  res.send('your requested to tags')
  res.sendFile('index.html')
})

app.get('/tags/:id', (req, res) => {
  const tag = tags.filter(tag => tag.id === req.params.id)
  
  if(tag.length === 1) {
    res.send(tag[0])
  } else if(tag.length === 0) {
    res.status(404).send({
      msg: 'tag not found'
    })
  } else {
    res.status(500).send({
      msg: 'internal server error'
    })
  }
})

app.get('/notes', (req, res) => {
  res.send(notes)
})

app.get('/notes/id/:id', (req, res) => {
  const note = notes.filter(note => note.id === req.params.id)
  
  if(note.length === 1) {
    res.send(note[0])
  } else if(note.length === 0) {
    res.status(404).send({
      msg: 'tag not found'
    })
  } else {
    res.status(500).send({
      msg: 'internal server error'
    })
  }
})

app.get('/notes/tag/:tagid', (req, res) => {
  const primaryList = notes.filter(note => note.tags.first.id === req.params.tagid)

  // const 

  res.send(primaryList)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server running on port ${PORT}`.cyan.inverse))