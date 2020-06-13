const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// @route     GET /api/v1/auth/me
// @desc      Get the logged in user
// @ access   Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('-role');

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @route     POST /api/v1/auth/login
// @desc      Login a user
// @ access   Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please add an email and password', 400));
  }

  const user = await User.findOne({ email: req.body.email }).select(
    '+password'
  );

  if (!user) {
    return next(new ErrorResponse('invalid credential', 400));
  }

  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch) {
    return next(new ErrorResponse('invalid credential', 400));
  }

  const token = user.getSignedJwtToken();

  res.status(202).json({
    success: true,
    token,
  });
});

// @route     POST /api/v1/auth/register
// @desc      Register a new user
// @ access   Public
exports.register = asyncHandler(async (req, res, next) => {
  if (req.body.role === 'admin') {
    return next(new ErrorResponse("admin role is't allowed", 403));
  }

  const user = await User.find({ email: req.body.email });

  if (user) {
    return next(new ErrorResponse('user already exists', 400));
  }

  const newUser = await User.create(req.body);

  const token = newUser.getSignedJwtToken();

  res.status(201).json({
    success: true,
    token,
  });
});
