const express = require('express')
const router = express.Router()
const notes = require('../db/notes')

router.get('/:id', (req, res) => {
  res.send(req.params.id)
})

module.exports = router