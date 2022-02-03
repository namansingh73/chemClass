const multer = require('multer');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const {
  deleteSingleFileCloudinary,
  uploadProfilePhotoCloudinary,
} = require('../cloudinary');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.photo = await uploadProfilePhotoCloudinary(
    req.file.buffer,
    'chemClass/profilePhotos'
  );

  next();
});

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
