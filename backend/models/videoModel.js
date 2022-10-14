const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    
    videoUrl: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },

    userId: {
      type: String,
      required: true,
    },

    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Video = mongoose.model("Video", VideoSchema);
module.exports = Video;
