import React from 'react';
import { Star, MessageCircle, Badge } from 'lucide-react';
import { Product } from '../../types';
import StarRating from '../common/StarRating';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div
      onClick={() => onClick(product)}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
          {product.category}
        </div>
        {product.totalReviews > 50 && (
          <div className="absolute top-3 left-3 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <Badge className="w-3 h-3 mr-1" />
            Popular
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
          <span className="text-lg font-bold text-blue-600 ml-2">
            ${product.price}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <StarRating rating={product.averageRating} readonly size="sm" />
            <span className="text-sm font-medium text-gray-900">
              {product.averageRating.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MessageCircle className="w-4 h-4 mr-1" />
            {product.totalReviews} reviews
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {product.features.slice(0, 2).map((feature, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
          {product.features.length > 2 && (
            <span className="text-xs text-gray-500">
              +{product.features.length - 2} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{product.brand}</span>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;