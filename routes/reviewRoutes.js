const express = require("express");
const Review = require("../models/reviewModel");

const router = express.Router();

/* =========================
   GET ALL REVIEWS
========================= */

router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.error("Get reviews error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
});

/* =========================
   ADD REVIEW
========================= */

router.post("/", async (req, res) => {
  try {
    const { name, rating, review } = req.body;

    if (!name || !rating || !review) {
      return res.status(400).json({
        success: false,
        message: "Name, rating and review are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const newReview = await Review.create({
      name,
      rating,
      review,
    });

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review: newReview,
    });
  } catch (error) {
    console.error("Add review error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save review",
    });
  }
});

module.exports = router;