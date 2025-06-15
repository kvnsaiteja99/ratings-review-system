import { useState, useEffect } from 'react';
import { Review, ReviewFilters } from '../types';
import { useAuth } from '../context/AuthContext';

const mockReviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userId: 'user1',
    username: 'techreviewer',
    rating: 5,
    title: 'Excellent sound quality!',
    comment: 'These headphones exceeded my expectations. The noise cancellation is fantastic and the battery life is amazing.',
    helpful: 15,
    createdAt: '2024-01-15',
    verified: true,
  },
  {
    id: '2',
    productId: '1',
    userId: 'user2',
    username: 'musiclover',
    rating: 4,
    title: 'Great for music',
    comment: 'Perfect for listening to music. The bass is deep and the highs are crisp. Only complaint is they can get a bit warm during long sessions.',
    helpful: 8,
    createdAt: '2024-01-20',
    verified: true,
  },
  {
    id: '3',
    productId: '2',
    userId: 'user3',
    username: 'fitnessfan',
    rating: 4,
    title: 'Good fitness tracker',
    comment: 'Accurate heart rate monitoring and GPS. The battery lasts about 5 days with regular use.',
    helpful: 12,
    createdAt: '2024-01-18',
    verified: true,
  },
];

export const useReviews = (productId?: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ReviewFilters>({ sortBy: 'newest' });
  const { user } = useAuth();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const storedReviews = localStorage.getItem('reviews');
      let allReviews = storedReviews ? JSON.parse(storedReviews) : mockReviews;
      
      if (!storedReviews) {
        localStorage.setItem('reviews', JSON.stringify(mockReviews));
      }

      if (productId) {
        allReviews = allReviews.filter((review: Review) => review.productId === productId);
      }

      setReviews(allReviews);
      setLoading(false);
    }, 500);
  }, [productId]);

  const addReview = async (reviewData: Omit<Review, 'id' | 'createdAt' | 'helpful'>): Promise<boolean> => {
    if (!user) return false;

    try {
      const newReview: Review = {
        ...reviewData,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        helpful: 0,
      };

      const storedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
      storedReviews.push(newReview);
      localStorage.setItem('reviews', JSON.stringify(storedReviews));

      if (!productId || newReview.productId === productId) {
        setReviews(prev => [...prev, newReview]);
      }

      // Update product rating
      updateProductRating(reviewData.productId, reviewData.rating);

      return true;
    } catch (error) {
      return false;
    }
  };

  const updateProductRating = (productId: string, newRating: number) => {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const productIndex = products.findIndex((p: any) => p.id === productId);
    
    if (productIndex !== -1) {
      const product = products[productIndex];
      const totalRating = product.averageRating * product.totalReviews + newRating;
      const newTotalReviews = product.totalReviews + 1;
      
      products[productIndex] = {
        ...product,
        averageRating: totalRating / newTotalReviews,
        totalReviews: newTotalReviews,
      };
      
      localStorage.setItem('products', JSON.stringify(products));
    }
  };

  const filteredAndSortedReviews = reviews
    .filter(review => !filters.rating || review.rating === filters.rating)
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'rating-high':
          return b.rating - a.rating;
        case 'rating-low':
          return a.rating - b.rating;
        case 'helpful':
          return b.helpful - a.helpful;
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  return {
    reviews: filteredAndSortedReviews,
    loading,
    filters,
    setFilters,
    addReview,
  };
};