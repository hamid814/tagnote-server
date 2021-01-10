const express = require('express');
const Ip = require('../models/Ip');

const router = express.Router();

router.get('/', async (req, res, next) => {
  let ips = await Ip.find().select('-_id -__v');

  // ips = ips.map()

  res.json(ips);
});

module.exports = router;
