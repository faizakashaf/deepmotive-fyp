const express = require("express");
const router = express.Router();
const Challenge = require("../models/Challenge");

// GET all challenges
router.get("/", async (req, res) => {
  try {
    const challenges = await Challenge.find().sort({ createdAt: -1 });
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE new challenge
router.post("/", async (req, res) => {
  try {
    const challenge = new Challenge(req.body);
    const newChallenge = await challenge.save();
    res.status(201).json(newChallenge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// JOIN challenge
router.patch("/:id/join", async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    challenge.joined = true;
    challenge.participants += 1;

    const updatedChallenge = await challenge.save();
    res.json(updatedChallenge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE challenge progress
router.patch("/:id/progress", async (req, res) => {
  try {
    const { amount } = req.body;
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    const newProgress = Math.max(0, Math.min(
      challenge.progress + amount,
      challenge.duration
    ));
    
    challenge.progress = newProgress;
    challenge.completed = newProgress >= challenge.duration;

    const updatedChallenge = await challenge.save();
    res.json(updatedChallenge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE challenge
router.delete("/:id", async (req, res) => {
  try {
    const challenge = await Challenge.findByIdAndDelete(req.params.id);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }
    res.json({ message: "Challenge deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;