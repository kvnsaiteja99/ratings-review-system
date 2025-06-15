import { useState, useEffect } from 'react';
import { Product } from '../types';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 299.99,
    averageRating: 4.5,
    totalReviews: 128,
    features: ['Noise Cancellation', 'Wireless', '30-hour Battery', 'Premium Sound'],
    brand: 'AudioTech',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and smart notifications.',
    category: 'Wearables',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 249.99,
    averageRating: 4.2,
    totalReviews: 89,
    features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', 'Smart Notifications'],
    brand: 'FitTech',
    createdAt: '2024-01-02',
  },
  {
    id: '3',
    name: 'Professional DSLR Camera',
    description: 'Professional-grade DSLR camera with advanced features for photography enthusiasts.',
    category: 'Photography',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 899.99,
    averageRating: 4.8,
    totalReviews: 45,
    features: ['24MP Sensor', '4K Video', 'Weather Sealed', 'Dual Card Slots'],
    brand: 'PhotoPro',
    createdAt: '2024-01-03',
  },
  {
    id: '4',
    name: 'Gaming Laptop Pro',
    description: 'High-performance gaming laptop with latest GPU and processor for ultimate gaming experience.',
    category: 'Computers',
    image: 'https://images.pexels.com/photos/38568/apple-imac-ipad-workplace-38568.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 1299.99,
    averageRating: 4.6,
    totalReviews: 73,
    features: ['RTX Graphics', '16GB RAM', '144Hz Display', 'RGB Keyboard'],
    brand: 'GameTech',
    createdAt: '2024-01-04',
  },
  {
    id: '5',
    name: 'Smart Home Hub',
    description: 'Central hub for all your smart home devices with voice control and automation.',
    category: 'Smart Home',
    image: 'https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 149.99,
    averageRating: 4.3,
    totalReviews: 156,
    features: ['Voice Control', 'Home Automation', 'Security Integration', 'Mobile App'],
    brand: 'SmartLife',
    createdAt: '2024-01-05',
  },
  {
    id: '6',
    name: 'Premium Coffee Maker',
    description: 'Professional-grade coffee maker with precision brewing and customizable settings.',
    category: 'Kitchen',
    image: 'https://images.pexels.com/photos/4226876/pexels-photo-4226876.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 199.99,
    averageRating: 4.4,
    totalReviews: 92,
    features: ['Precision Brewing', 'Programmable', 'Built-in Grinder', 'Thermal Carafe'],
    brand: 'BrewMaster',
    createdAt: '2024-01-06',
  },
];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        setProducts(mockProducts);
        localStorage.setItem('products', JSON.stringify(mockProducts));
      }
      setLoading(false);
    }, 1000);
  }, []);

  const getProduct = (id: string): Product | undefined => {
    return products.find(product => product.id === id);
  };

  const getProductsByCategory = (category: string): Product[] => {
    return products.filter(product => product.category === category);
  };

  return {
    products,
    loading,
    getProduct,
    getProductsByCategory,
  };
};