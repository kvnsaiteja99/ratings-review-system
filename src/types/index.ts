export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  joinDate: string;
  role: 'user' | 'admin';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  price: number;
  averageRating: number;
  totalReviews: number;
  features: string[];
  brand: string;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  username: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  helpful: number;
  createdAt: string;
  verified: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface ReviewFilters {
  rating?: number;
  sortBy: 'newest' | 'oldest' | 'rating-high' | 'rating-low' | 'helpful';
  category?: string;
}