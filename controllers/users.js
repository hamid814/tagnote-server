const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// @route       GET /api/v1/users
// @desc        Get All Users
// @ access     Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @route       GET /api/v1/users/:id
// @desc        Get Single User
// @ access     Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse('user not found', 404));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @route       PUT /api/v1/users/:id
// @desc        update a user
// @ access     Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse('user not found', 404));
  }

  delete req.body._id;

  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @route       DELETE /api/v1/users/:id
// @desc        Delete a user with Id
// @ access     Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorResponse('no Id sent', 400));
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse('user note found', 404));
  }

  await user.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
