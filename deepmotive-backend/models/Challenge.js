const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Challenge title is required"],
    trim: true,
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "Description cannot exceed 500 characters"],
  },
  duration: {
    type: Number,
    min: [1, "Duration must be at least 1 day"],
    default: 7,
  },
  goal: {
    type: String,
    required: [true, "Goal description is required"],
  },
  participants: {
    type: Number,
    default: 1,
    min: 0,
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  joined: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    enum: [
      "Fitness",
      "Learning",
      "Productivity",
      "Mindfulness",
      "Social",
      "Other",
    ],
    default: "Other",
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Medium",
  },
  createdBy: {
    type: String,
    default: "default",
  },
}, {
  timestamps: true
});


const Challenge = mongoose.models.Challenge || mongoose.model("Challenge", challengeSchema);
module.exports = Challenge;