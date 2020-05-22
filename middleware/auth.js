const asyncHandler = require('./asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorResponse('Please login first!', 401));
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorResponse('not allowed to access this route', 401));
    }

    req.user = user;

    next();
  } catch (err) {
    return next(new ErrorResponse('not allowed to access this route', 401));
  }
});
