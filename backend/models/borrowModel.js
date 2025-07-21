const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  borrowDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  returned: {
    type: Boolean,
    default: false,
  }
});

const BorrowModel = mongoose.model("Borrow", borrowSchema);
module.exports = BorrowModel;
