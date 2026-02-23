const express = require("express");
const router = express.Router();
const JournalEntry = require("../models/JournalEntry");

// GET all journal entries
router.get("/", async (req, res) => {
  try {
    const entries = await JournalEntry.find().sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE new journal entry
router.post("/", async (req, res) => {
  try {
    const entry = new JournalEntry(req.body);
    const newEntry = await entry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE journal entry
router.put("/:id", async (req, res) => {
  try {
    const entry = await JournalEntry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!entry) {
      return res.status(404).json({ message: "Journal entry not found" });
    }
    res.json(entry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE journal entry
router.delete("/:id", async (req, res) => {
  try {
    const entry = await JournalEntry.findByIdAndDelete(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: "Journal entry not found" });
    }
    res.json({ message: "Journal entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
