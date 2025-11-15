const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// @route   POST /api/feedback
// @desc    Create new feedback
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;

    // Validation
    if (!name || !message) {
      return res.status(400).json({ 
        error: 'Name and message are required fields' 
      });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ 
        error: 'Rating must be between 1 and 5' 
      });
    }

    const feedback = new Feedback({
      name,
      email,
      message,
      rating: Number(rating)
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      data: feedback,
      message: 'Feedback submitted successfully'
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

// @route   GET /api/feedback
// @desc    Get all feedback with optional filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { rating, search } = req.query;
    let query = {};

    // Filter by rating if provided
    if (rating) {
      query.rating = Number(rating);
    }

    // Search in name, email, or message
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    const feedbacks = await Feedback.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: feedbacks.length,
      data: feedbacks
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

// @route   GET /api/feedback/stats
// @desc    Get feedback statistics
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const totalFeedbacks = await Feedback.countDocuments();
    
    const feedbacks = await Feedback.find();
    
    const totalRating = feedbacks.reduce((sum, fb) => sum + fb.rating, 0);
    const averageRating = totalFeedbacks > 0 
      ? (totalRating / totalFeedbacks).toFixed(2) 
      : 0;
    
    const positiveRatings = feedbacks.filter(fb => fb.rating >= 4).length;
    const negativeRatings = feedbacks.filter(fb => fb.rating < 3).length;

    res.json({
      success: true,
      data: {
        totalFeedbacks,
        averageRating: Number(averageRating),
        positiveRatings,
        negativeRatings
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

// @route   DELETE /api/feedback/:id
// @desc    Delete feedback (bonus feature)
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    res.json({
      success: true,
      message: 'Feedback deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

module.exports = router;