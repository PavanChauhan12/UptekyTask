import { useState } from 'react';
import { Send, Star } from 'lucide-react';

const FeedbackForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 0
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleRatingClick = (rating) => {
    setFormData({ ...formData, rating });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.message) {
      setError('Name and message are required');
      return;
    }

    if (formData.rating === 0) {
      setError('Please select a rating');
      return;
    }

    setLoading(true);

    try {
      await onSubmitSuccess(formData);
      setFormData({ name: '', email: '', message: '', rating: 0 });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-form-container">
      <div className="form-header">
        <h2>Share Your Feedback</h2>
        <p>We'd love to hear from you!</p>
      </div>

      <form onSubmit={handleSubmit} className="feedback-form">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us what you think..."
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label>Rating *</label>
          <div className="rating-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={32}
                className={`star ${
                  star <= (hoveredRating || formData.rating) ? 'active' : ''
                }`}
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                fill={star <= (hoveredRating || formData.rating) ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          {formData.rating > 0 && (
            <span className="rating-text">
              {formData.rating} out of 5 stars
            </span>
          )}
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? (
            'Submitting...'
          ) : (
            <>
              <Send size={18} />
              Submit Feedback
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;