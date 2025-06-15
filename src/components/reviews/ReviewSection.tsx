import React, { useState } from 'react';
import { useReviews } from '../../hooks/useReviews';
import { useAuth } from '../../context/AuthContext';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
import ReviewFilters from './ReviewFilters';

interface ReviewSectionProps {
  productId: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ productId }) => {
  const { reviews, loading, filters, setFilters, addReview } = useReviews(productId);
  const { isAuthenticated } = useAuth();
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleAddReview = async (reviewData: any) => {
    const success = await addReview({
      ...reviewData,
      productId,
    });
    
    if (success) {
      setShowReviewForm(false);
    }
    
    return success;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4 mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Review Stats */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Customer Reviews ({reviews.length})
          </h3>
          {isAuthenticated && (
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {showReviewForm ? 'Cancel' : 'Write Review'}
            </button>
          )}
        </div>

        {/* Rating Distribution */}
        {reviews.length > 0 && (
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = reviews.filter(r => Math.floor(r.rating) === rating).length;
              const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
              
              return (
                <div key={rating} className="flex items-center space-x-3 text-sm">
                  <span className="w-8">{rating} ⭐</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="w-12 text-gray-600">{count}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <ReviewForm
          onSubmit={handleAddReview}
          onCancel={() => setShowReviewForm(false)}
        />
      )}

      {/* Review Filters */}
      <ReviewFilters filters={filters} onFiltersChange={setFilters} />

      {/* Review List */}
      <ReviewList reviews={reviews} />

      {!isAuthenticated && (
        <div className="text-center py-6 bg-blue-50 rounded-lg">
          <p className="text-gray-600 mb-2">Want to share your experience?</p>
          <p className="text-sm text-gray-500">Sign in to write a review</p>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;