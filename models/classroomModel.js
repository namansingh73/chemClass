const mongoose = require('mongoose');
const validator = require('validator');
const { customAlphabet } = require('nanoid');

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 7);

const classroomSchema = new mongoose.Schema(
  {
    classCode: {
      type: 'String',
      default: nanoid,
      unique: true,
    },
    name: {
      type: 'String',
      required: [true, 'Class must have a name'],
      trim: true,
      minlength: [1, 'Class name must be non empty'],
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    students: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      default: [],
    },
    meetLink: {
      type: String,
      validate: [validator.isURL, 'Invalid Meet Link'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

classroomSchema.virtual('posts', {
  ref: 'Post', // The model to use
  localField: '_id', // Find Post where `localField`
  foreignField: 'classroom', // is equal to `foreignField`
});

const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;
