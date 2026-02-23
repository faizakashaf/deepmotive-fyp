const mongoose = require("mongoose");

const journalEntrySchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Journal content is required"],
    trim: true,
  },
  mood: {
    type: String,
    enum: ["happy", "neutral", "sad"],
    default: "neutral",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  habitsMentioned: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habit",
    },
  ],
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const JournalEntry = mongoose.model("JournalEntry", journalEntrySchema);
module.exports = JournalEntry;
