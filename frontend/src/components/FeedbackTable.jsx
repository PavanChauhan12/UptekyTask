import { Star, Trash2, Mail, User, Calendar } from 'lucide-react';

const FeedbackTable = ({ feedbacks, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating) => {
    return (
      <div className="stars-display">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            fill={star <= rating ? 'currentColor' : 'none'}
            className={star <= rating ? 'star-filled' : 'star-empty'}
          />
        ))}
      </div>
    );
  };

  const getRatingClass = (rating) => {
    if (rating >= 4) return 'rating-positive';
    if (rating >= 3) return 'rating-neutral';
    return 'rating-negative';
  };

  if (feedbacks.length === 0) {
    return (
      <div className="empty-state">
        <MessageSquare size={64} />
        <h3>No Feedback Yet</h3>
        <p>Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="feedback-table-container">
      <div className="table-responsive">
        <table className="feedback-table">
          <thead>
            <tr>
              <th>
                <User size={16} />
                Name
              </th>
              <th>
                <Mail size={16} />
                Email
              </th>
              <th>Rating</th>
              <th>Message</th>
              <th>
                <Calendar size={16} />
                Date
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback._id} className="feedback-row">
                <td className="name-cell">
                  <div className="avatar">
                    {feedback.name.charAt(0).toUpperCase()}
                  </div>
                  <span>{feedback.name}</span>
                </td>
                <td className="email-cell">{feedback.email}</td>
                <td>
                  <div className={`rating-badge ${getRatingClass(feedback.rating)}`}>
                    {renderStars(feedback.rating)}
                    <span className="rating-number">{feedback.rating}</span>
                  </div>
                </td>
                <td className="message-cell">
                  <p>{feedback.message}</p>
                </td>
                <td className="date-cell">
                  {formatDate(feedback.createdAt)}
                </td>
                <td className="actions-cell">
                  <button
                    onClick={() => onDelete(feedback._id)}
                    className="delete-btn"
                    title="Delete feedback"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackTable;