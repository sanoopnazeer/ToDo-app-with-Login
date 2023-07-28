const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model('notes', noteSchema)

module.exports = Note;