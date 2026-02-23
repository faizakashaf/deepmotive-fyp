import Habit from "../models/Habit.js";

export const getHabits = async (req, res) => {
  const habits = await Habit.find();
  res.json(habits);
};

export const createHabit = async (req, res) => {
  const habit = await Habit.create(req.body);
  res.status(201).json(habit);
};

export const deleteHabit = async (req, res) => {
  await Habit.findByIdAndDelete(req.params.id);
  res.json({ message: "Habit deleted" });
};

export const toggleHabit = async (req, res) => {
  const habit = await Habit.findById(req.params.id);
  habit.completion[req.body.day] = !habit.completion[req.body.day];
  await habit.save();
  res.json(habit);
};
