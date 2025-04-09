import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/products.css';
import { formatPrice } from '../utils/formatPrice';

function AllProducts() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const categories = [
    'All', 'Electronics', 'Clothing', 'Home & Garden', 
    'Beauty', 'Sports', 'Books'
  ];

  const allProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      category: "Electronics",
      price: "199.99",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Denim Jacket",
      category: "Clothing",
      price: "89.99",
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Smart Watch",
      category: "Electronics",
      price: "299.99",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Running Shoes",
      category: "Sports",
      price: "129.99",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Home Decor Set",
      category: "Home & Garden",
      price: "149.99",
      image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=300&h=300&fit=crop"
    },
    {
      id: 6,
      name: "Skincare Set",
      category: "Beauty",
      price: "79.99",
      image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=300&h=300&fit=crop"
    },
    // Add more products as needed...
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? allProducts 
    : allProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="all-products-page">
      <div className="filters-section">
        <button 
          className="filters-toggle"
          onClick={() => setIsFiltersVisible(!isFiltersVisible)}
        >
          {isFiltersVisible ? 'Hide Filters ▼' : 'Show Filters ▲'}
        </button>
        <div className={`filters ${isFiltersVisible ? 'expanded' : ''}`}>
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`filter-btn ${selectedCategory === cat.toLowerCase() ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.toLowerCase())}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="products-grid">
        {filteredProducts.map((product, index) => (
          <Link 
            to={`/products/${product.id}`} 
            key={product.id} 
            className="product-card"
            style={{"--card-index": index}}
          >
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="category">{product.category}</p>
              <p className="price">{formatPrice(product.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
