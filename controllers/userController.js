const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const {
  multerUpload,
  deleteSingleFileCloudinary,
  uploadProfilePhotoCloudinary,
} = require('../cloudinary');

const upload = multerUpload(5);

exports.uploadUserPhoto = upload.single('photo');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  if (req.file) {
    req.photo = await uploadProfilePhotoCloudinary(
      req.file.path,
      'chemClass/profilePhotos'
    );
  }

  if (req.body.email && req.body.email !== req.user.email) {
    const user = await User.findById(req.user.id).select('+password');

    if (
      !req.body.passwordForEmailUpdation ||
      !(await user.correctPassword(
        req.body.passwordForEmailUpdation,
        user.password
      ))
    ) {
      return next(new AppError('Incorrect Password', 400));
    }
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  if (req.photo) filteredBody.photo = req.photo;

  // 3) Update user document
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    if (req.user?.photo?.public_id) {
      await deleteSingleFileCloudinary(req.user.photo.public_id);
    }

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    if (req?.photo?.public_id) {
      await deleteSingleFileCloudinary(req.user.photo.public_id);
    }

    throw err;
  }
});

exports.getUser = factory.getOne(User);
