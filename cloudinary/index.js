const { promisify } = require('util');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const AppError = require('../utils/appError');

const uploadFromBuffer = (fileBuffer, transformations) => {
  return new Promise((resolve, reject) => {
    const cld_upload_stream = cloudinary.uploader.upload_stream(
      transformations,
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(cld_upload_stream);
  });
};

exports.deleteSingleFileCloudinary = async (public_id) => {
  try {
    await promisify(cloudinary.uploader.destroy)(public_id);
  } catch (err) {
    console.log(
      `🤣 Cannot delete photo with public id: ${req.user.photo.public_id}`
    );
  }
};

exports.uploadSingleFileCloudinary = async (
  fileBuffer,
  folder = 'chemClass'
) => {
  try {
    const { url, public_id } = await uploadFromBuffer(fileBuffer, {
      folder,
      gravity: 'face',
      aspect_ratio: '1.0',
      crop: 'fill',
      fetch_format: 'png',
    });

    return {
      url,
      public_id,
    };
  } catch (err) {
    throw new AppError('Something went wrong!', 500);
  }
};
