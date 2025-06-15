import React from 'react';
import { ReviewFilters as ReviewFiltersType } from '../../types';
import StarRating from '../common/StarRating';

interface ReviewFiltersProps {
  filters: ReviewFiltersType;
  onFiltersChange: (filters: ReviewFiltersType) => void;
}

const ReviewFilters: React.FC<ReviewFiltersProps> = ({ filters, onFiltersChange }) => {
  const handleRatingFilter = (rating: number) => {
    const newRating = filters.rating === rating ? undefined : rating;
    onFiltersChange({ ...filters, rating: newRating });
  };

  const handleSortChange = (sortBy: ReviewFiltersType['sortBy']) => {
    onFiltersChange({ ...filters, sortBy });
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Filter by rating:</span>
          <div className="flex space-x-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingFilter(rating)}
                className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  filters.rating === rating
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span>{rating}</span>
                <span className="text-yellow-400">⭐</span>
              </button>
            ))}
            {filters.rating && (
              <button
                onClick={() => handleRatingFilter(0)}
                className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value as ReviewFiltersType['sortBy'])}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="rating-high">Highest Rated</option>
            <option value="rating-low">Lowest Rated</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ReviewFilters;