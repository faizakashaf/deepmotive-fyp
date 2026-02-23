import express from "express";
import {
  getHabits,
  createHabit,
  deleteHabit,
  toggleHabit,
} from "../controllers/habitController.js";

const router = express.Router();

router.get("/", getHabits);
router.post("/", createHabit);
router.delete("/:id", deleteHabit);
router.patch("/:id/toggle", toggleHabit);

export default router;
