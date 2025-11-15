import axios from 'axios';

// Use environment variable for API URL, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API methods
export const feedbackAPI = {
  // Submit new feedback
  submitFeedback: async (feedbackData) => {
    try {
      const response = await api.post('/feedback', feedbackData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to submit feedback';
    }
  },

  // Get all feedback with optional filters
  getFeedbacks: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.rating) params.append('rating', filters.rating);
      if (filters.search) params.append('search', filters.search);
      
      const response = await api.get(`/feedback?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch feedbacks';
    }
  },

  // Get statistics
  getStats: async () => {
    try {
      const response = await api.get('/feedback/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch statistics';
    }
  },

  // Delete feedback
  deleteFeedback: async (id) => {
    try {
      const response = await api.delete(`/feedback/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to delete feedback';
    }
  },
};

export default api;