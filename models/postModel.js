const mongoose = require('mongoose');
const AppError = require('../utils/appError');

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  text: {
    type: String,
    minlength: [1, 'Comment must be non empty'],
    required: [true, 'Comment must be non empty'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const assignmentSchema = new mongoose.Schema({
  due: {
    type: Date,
    required: [true, 'Assignment must have a deadline'],
    default: () => Date.now() + 24 * 60 * 60 * 1000,
  },
  submissions: {
    type: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        attachment: Object,
        submittedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    default: [],
  },
});

assignmentSchema.pre('save', function (next) {
  if (!this.isNew && !this.isModified('due')) return next();

  if (this.due < Date.now()) {
    throw new AppError('Due date must be of future!', 400);
  }
  next();
});

const postSchema = new mongoose.Schema(
  {
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Classroom',
    },
    postType: {
      type: String,
      enum: ['announcement', 'assignment'],
      default: 'announcement',
    },
    text: {
      type: String,
    },
    attachments: [Object], // url, public_id, orginalname
    comments: {
      type: [commentSchema],
      default: [],
    },
    assignmentDetails: assignmentSchema,
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
