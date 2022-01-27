const mongoose = require('mongoose');

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
    attachments: [Object], // url, public_id, name
    comments: {
      type: [
        {
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
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
