const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Habit name is required"],
    trim: true,
    maxlength: [100, "Habit name cannot exceed 100 characters"],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "Description cannot exceed 500 characters"],
  },
  category: {
    type: String,
    enum: [
      "Wellness",
      "Fitness",
      "Learning",
      "Productivity",
      "Social",
      "Other",
    ],
    default: "Wellness",
  },
  color: {
    type: String,
    default: "bg-blue-500",
  },
  frequency: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
    default: "daily",
  },
  goal: {
    type: Number,
    min: [1, "Goal must be at least 1"],
    max: [7, "Goal cannot exceed 7"],
    default: 7,
  },
  completion: {
    type: [Boolean],
    default: [false, false, false, false, false, false, false],
  },
  currentStreak: {
    type: Number,
    default: 0,
    min: 0,
  },
  longestStreak: {
    type: Number,
    default: 0,
    min: 0,
  },
  archived: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String,
    default: "default",
  },
}, {
  timestamps: true
});

// Virtual for completion rate
habitSchema.virtual("completionRate").get(function () {
  if (this.completion.length === 0) return 0;
  const completed = this.completion.filter(Boolean).length;
  return Math.round((completed / this.completion.length) * 100);
});

// Update streak calculation method
habitSchema.methods.updateStreak = function(day) {
  // Toggle completion
  this.completion[day] = !this.completion[day];
  
  // Calculate current streak
  let streak = 0;
  for (let i = this.completion.length - 1; i >= 0; i--) {
    if (this.completion[i]) {
      streak++;
    } else {
      break;
    }
  }
  
  this.currentStreak = streak;
  
  // Update longest streak if needed
  if (streak > this.longestStreak) {
    this.longestStreak = streak;
  }
  
  return this;
};

// Check if model exists before creating new one
const Habit = mongoose.models.Habit || mongoose.model("Habit", habitSchema);
module.exports = Habit;