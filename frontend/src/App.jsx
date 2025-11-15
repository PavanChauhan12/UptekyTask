import { useState, useEffect } from 'react';
import { feedbackAPI } from './services/api';
import FeedbackForm from './components/FeedbackForm';
import AnalyticsCards from './components/AnalyticsCards';
import SearchFilter from './components/SearchFilter';
import FeedbackTable from './components/FeedbackTable';
import { MessageSquare, AlertCircle } from 'lucide-react';
import './index.css';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [filters, setFilters] = useState({ search: '', rating: '' });

  // Fetch feedbacks
  const fetchFeedbacks = async (filterParams = {}) => {
    try {
      setLoading(true);
      const response = await feedbackAPI.getFeedbacks(filterParams);
      setFeedbacks(response.data);
      setError('');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch statistics
  const fetchStats = async () => {
    try {
      const response = await feedbackAPI.getStats();
      setStats(response.data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  // Initial load
  useEffect(() => {
    fetchFeedbacks();
    fetchStats();
  }, []);

  // Handle form submission
  const handleSubmitFeedback = async (formData) => {
    try {
      await feedbackAPI.submitFeedback(formData);
      setSuccessMessage('Thank you for your feedback!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Refresh data
      fetchFeedbacks(filters);
      fetchStats();
    } catch (err) {
      throw err;
    }
  };

  // Handle filter change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchFeedbacks(newFilters);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) {
      return;
    }

    try {
      await feedbackAPI.deleteFeedback(id);
      fetchFeedbacks(filters);
      fetchStats();
    } catch (err) {
      setError(err);
    }
  };

  // Export to CSV
  const handleExport = () => {
    if (feedbacks.length === 0) {
      alert('No feedbacks to export');
      return;
    }

    const headers = ['Name', 'Email', 'Rating', 'Message', 'Created At'];
    const csvContent = [
      headers.join(','),
      ...feedbacks.map(fb => 
        [
          `"${fb.name}"`,
          `"${fb.email}"`,
          fb.rating,
          `"${fb.message.replace(/"/g, '""')}"`,
          `"${new Date(fb.createdAt).toLocaleString()}"`
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `feedbacks_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <MessageSquare size={32} />
              <div>
                <h1>Feedback Dashboard</h1>
                <p>Manage customer feedback efficiently</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        <div className="container">
          {/* Success Message */}
          {successMessage && (
            <div className="success-banner">
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="error-banner">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          {/* Two Column Layout */}
          <div className="grid-layout">
            {/* Left Column - Form */}
            <div className="left-column">
              <FeedbackForm onSubmitSuccess={handleSubmitFeedback} />
            </div>

            {/* Right Column - Analytics & Table */}
            <div className="right-column">
              <AnalyticsCards stats={stats} />
              
              <div className="feedback-section">
                <SearchFilter
                  onFilterChange={handleFilterChange}
                  onExport={handleExport}
                  totalCount={feedbacks.length}
                />
                
                {loading ? (
                  <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading feedbacks...</p>
                  </div>
                ) : (
                  <FeedbackTable
                    feedbacks={feedbacks}
                    onDelete={handleDelete}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Feedback Dashboard. Built with MERN Stack.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;