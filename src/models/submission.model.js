const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },

    code: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      enum: [
        "cpp",
        "java",
        "python",
        "javascript"
      ],
      required: true,
    },

    status: {
      type: String,
      enum:[
   "PENDING",
   "RUNNING",
   "ACCEPTED",
   "WRONG_ANSWER",
   "COMPILATION_ERROR",
   "RUNTIME_ERROR",
   "TIME_LIMIT_EXCEEDED"
],
      default: "PENDING",
    },

    executionTime: {
      type: Number,
      default: 0,
    },

    memoryUsed: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Submission",
  submissionSchema
);