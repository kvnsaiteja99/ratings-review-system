import React, { useState } from 'react';
import { ThumbsUp, Shield, Calendar } from 'lucide-react';
import { Review } from '../../types';
import StarRating from '../common/StarRating';

interface ReviewItemProps {
  review: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const [helpful, setHelpful] = useState(review.helpful);
  const [hasVoted, setHasVoted] = useState(false);

  const handleHelpfulClick = () => {
    if (!hasVoted) {
      setHelpful(helpful + 1);
      setHasVoted(true);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {review.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-medium text-gray-900">{review.username}</h4>
              {review.verified && (
                <div className="flex items-center space-x-1 text-green-600">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs font-medium">Verified</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <StarRating rating={review.rating} readonly size="sm" />
              <span className="text-sm text-gray-500 flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(review.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handleHelpfulClick}
          disabled={hasVoted}
          className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
            hasVoted
              ? 'bg-green-100 text-green-700 cursor-not-allowed'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
          <span>Helpful ({helpful})</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewItem;