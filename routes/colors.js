const express = require('express')
let colors = require('../db/colors.js')
const shortid = require('shortid')

const router = express.Router()

// @ route     GET /colors
// @ desc      get all colors
router.get('/', (req, res) => {
  res.send(colors)
})

// @ route     POST /colors
// @ desc      get all colors
router.post('/', (req, res) => {
  const newColor = {
    id: shortid.generate(),
    name: 'test name',
    value: req.body.color
  }

  colors = [...colors, newColor]
  
  ser.status(200).send({
    status: 'success',
    msg: 'color added'
  })
})

module.exports = router;