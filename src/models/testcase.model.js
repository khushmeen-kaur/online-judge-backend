const mongoose = require("mongoose");

const testCaseSchema = new mongoose.Schema(
  {
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },

    input: {
      type: String,
      required: true,
    },

    expectedOutput: {
      type: String,
      required: true,
    },

    isHidden: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const testcaseModel= mongoose.model(
  "TestCase",
  testCaseSchema
);

module.exports=testcaseModel;