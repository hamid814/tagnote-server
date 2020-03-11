const express = require('express')
const colors = require('../db/colors.js')

const router = express.Router()

// @ route     GET /colors
// @ desc      get all colors
router.get('/', (req, res) => {
  res.send(colors)
})

module.exports = router;