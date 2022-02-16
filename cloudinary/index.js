const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const AppError = require('../utils/appError');

exports.multerUpload = (maxFileSizeMb = 5, allowPdfs = false) => {
  const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, './uploads'));
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${Math.random()}.${file.mimetype.split('/')[1]}`);
    },
  });

  const multerFilter = (req, file, cb) => {
    if (
      file.mimetype.startsWith('image') ||
      (allowPdfs && file.mimetype === 'application/pdf')
    ) {
      cb(null, true);
    } else {
      cb(
        new AppError(
          allowPdfs
            ? 'Not a valid doc! Please upload images and pdfs only.'
            : 'Not an image! Please upload only images.',
          400
        ),
        false
      );
    }
  };

  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fileSize: maxFileSizeMb * 1024 * 1024 },
  });

  return upload;
};

const deleteFileFromUploadsFolder = async (filePath) => {
  try {
    await promisify(fs.unlink)(filePath);
  } catch (err) {
    // do nothing if file cannot be deleted from uploads
  }
};

const deleteSingleFileCloudinary = async (public_id) => {
  try {
    await promisify(cloudinary.uploader.destroy)(public_id);
  } catch (err) {
    console.log(`🤣 Cannot delete photo with public id: ${public_id}`);
  }
};

exports.deleteSingleFileCloudinary = deleteSingleFileCloudinary;

exports.uploadProfilePhotoCloudinary = async (
  filePath,
  folder = 'chemClass'
) => {
  try {
    const { url, public_id } = await cloudinary.uploader.upload(filePath, {
      folder,
      gravity: 'face',
      aspect_ratio: '1.0',
      crop: 'fill',
      fetch_format: 'png',
    });

    await deleteFileFromUploadsFolder(filePath);

    return {
      url,
      public_id,
    };
  } catch (err) {
    await deleteFileFromUploadsFolder(filePath);
    throw new AppError('Please try again later!', 500);
  }
};

exports.uploadSingleFileCloudinary = async (filePath, folder = 'chemClass') => {
  try {
    const { url, public_id } = await cloudinary.uploader.upload(filePath, {
      folder,
    });

    await deleteFileFromUploadsFolder(filePath);

    return {
      url,
      public_id,
    };
  } catch (err) {
    await deleteFileFromUploadsFolder(filePath);
    throw new AppError('Please try again later!', 500);
  }
};

exports.uploadMultipleFilesCloudinary = async (
  filePaths,
  folder = 'chemClass'
) => {
  const filesAccepted = Array(filePaths.length);

  try {
    await Promise.all(
      filePaths.map(async (filePath, idx) => {
        const { url, public_id } = await cloudinary.uploader.upload(filePath, {
          folder,
        });

        filesAccepted[idx] = { url, public_id };
      })
    );

    filePaths.forEach(deleteFileFromUploadsFolder);

    return filesAccepted;
  } catch (err) {
    await Promise.allSettled(
      filesAccepted
        .filter(Boolean)
        .map(({ public_id }) => deleteSingleFileCloudinary(public_id))
    );

    filePaths.forEach(deleteFileFromUploadsFolder);

    throw new AppError('Please try again later!', 500);
  }
};
