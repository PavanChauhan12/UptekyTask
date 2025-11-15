import { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';

const SearchFilter = ({ onFilterChange, onExport, totalCount }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange({ search: value, rating: selectedRating });
  };

  const handleRatingChange = (e) => {
    const value = e.target.value;
    setSelectedRating(value);
    onFilterChange({ search: searchTerm, rating: value });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedRating('');
    onFilterChange({ search: '', rating: '' });
  };

  return (
    <div className="search-filter-container">
      <div className="filter-header">
        <h2 className="section-title">Feedback List</h2>
        <span className="count-badge">{totalCount} feedbacks</span>
      </div>

      <div className="filter-controls">
        <div className="search-wrapper">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, email, or message..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <Filter size={20} className="filter-icon" />
          <select
            value={selectedRating}
            onChange={handleRatingChange}
            className="rating-select"
          >
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        {(searchTerm || selectedRating) && (
          <button onClick={handleClearFilters} className="clear-btn">
            Clear Filters
          </button>
        )}

        <button onClick={onExport} className="export-btn">
          <Download size={18} />
          Export CSV
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;