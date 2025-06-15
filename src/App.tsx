import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Header from './components/common/Header';
import AuthModal from './components/auth/AuthModal';
import ProductGrid from './components/products/ProductGrid';
import Dashboard from './components/dashboard/Dashboard';
import { useProducts } from './hooks/useProducts';
import { BarChart3, Grid } from 'lucide-react';

function AppContent() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeView, setActiveView] = useState<'products' | 'dashboard'>('products');
  const { products, loading } = useProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAuthClick={() => setShowAuthModal(true)} />
      
      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveView('products')}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeView === 'products'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>Products</span>
            </button>
            <button
              onClick={() => setActiveView('dashboard')}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeView === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-8">
        {activeView === 'products' ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Reviews</h1>
              <p className="text-gray-600">Discover products and read authentic reviews from our community</p>
            </div>
            <ProductGrid products={products} loading={loading} />
          </div>
        ) : (
          <Dashboard />
        )}
      </main>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;