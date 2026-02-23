//routes/habits.js

const express = require("express");
const router = express.Router();
const Habit = require("../models/Habit");

// GET all habits
router.get("/", async (req, res) => {
  try {
    const habits = await Habit.find({ archived: false }).sort({
      createdAt: -1,
    });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single habit
router.get("/:id", async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }
    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE new habit
router.post("/", async (req, res) => {
  try {
    const habit = new Habit(req.body);
    const newHabit = await habit.save();
    res.status(201).json(newHabit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE habit
router.put("/:id", async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }
    res.json(habit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE habit
router.delete("/:id", async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(
      req.params.id,
      { archived: true },
      { new: true },
    );
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }
    res.json({ message: "Habit archived successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// TOGGLE habit completion for a specific day
router.patch("/:id/toggle", async (req, res) => {
  try {
    const { day } = req.body;
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    // Toggle completion for the day
    habit.completion[day] = !habit.completion[day];

    // Calculate streaks
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Simple streak calculation - you can enhance this
    const allCompletedToday = habit.completion[day];
    if (allCompletedToday) {
      habit.currentStreak += 1;
      if (habit.currentStreak > habit.longestStreak) {
        habit.longestStreak = habit.currentStreak;
      }
    } else {
      habit.currentStreak = 0;
    }

    const updatedHabit = await habit.save();
    res.json(updatedHabit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET habit statistics
router.get("/stats/overview", async (req, res) => {
  try {
    const habits = await Habit.find({ archived: false });

    const stats = {
      totalHabits: habits.length,
      completedToday: habits.filter((h) => h.completion[new Date().getDay()])
        .length,
      averageCompletion: 0,
      bestStreak: 0,
      strugglingHabits: [],
    };

    if (habits.length > 0) {
      const totalCompletion = habits.reduce((sum, habit) => {
        const completed = habit.completion.filter(Boolean).length;
        return sum + completed / habit.completion.length;
      }, 0);

      stats.averageCompletion = Math.round(
        (totalCompletion / habits.length) * 100,
      );
      stats.bestStreak = Math.max(...habits.map((h) => h.currentStreak), 0);

      // Find struggling habits (less than 30% completion)
      stats.strugglingHabits = habits
        .filter((habit) => {
          const completed = habit.completion.filter(Boolean).length;
          return completed / habit.completion.length < 0.3;
        })
        .map((habit) => ({
          id: habit._id,
          name: habit.name,
          completionRate: Math.round(
            (habit.completion.filter(Boolean).length /
              habit.completion.length) *
              100,
          ),
        }));
    }

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
