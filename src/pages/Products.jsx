import '../css/style.css';
import '../css/products.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { formatPrice } from '../utils/formatPrice';

function Products() {
  const heroSlides = [
    {
      id: 1,
      title: "Summer Collection",
      subtitle: "Discover our new arrivals",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=400&fit=crop",
      cta: "Shop Now"
    },
    {
      id: 2,
      title: "Winter Special",
      subtitle: "Up to 50% off",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=400&fit=crop",
      cta: "Explore Offers"
    },
    {
      id: 3,
      title: "Limited Edition",
      subtitle: "Exclusive designs",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
      cta: "View Collection"
    }
  ];

  const categories = [
    { 
      id: 1, 
      name: 'Electronics', 
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=300&fit=crop' 
    },
    { 
      id: 2, 
      name: 'Clothing', 
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop' 
    },
    { 
      id: 3, 
      name: 'Home & Garden', 
      image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=300&h=300&fit=crop' 
    },
    { 
      id: 4, 
      name: 'Beauty', 
      image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=300&h=300&fit=crop' 
    },
    { 
      id: 5, 
      name: 'Sports', 
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=300&fit=crop' 
    },
    { 
      id: 6, 
      name: 'Books', 
      image: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=300&h=300&fit=crop' 
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="products-page">
      <section className="hero-slider">
        <div className="slider-container" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {heroSlides.map((slide) => (
            <div key={slide.id} className="slide">
              <img src={slide.image} alt={slide.title} />
              <div className="slide-content">
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
                <Link to="/products" className="btn btn-primary">{slide.cta}</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="slider-controls">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="categories-section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <Link to={`/categories/${category.id}`} key={category.id} className="category-card">
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="best-sellers">
        <div className="section-header">
          <h2 className="section-title">Best Sellers</h2>
          <Link to="/all-products" className="view-all">View All Products →</Link>
        </div>
        <div className="products-grid">
          {products.filter(p => p.isBestSeller).map((product, index) => (
            <Link 
              to={`/products/${product.id}`} 
              key={product.id} 
              className="product-card"
              style={{"--card-index": index}}
            >
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="category">Category: {product.category}</p>
              <p className="price">{formatPrice(product.price)}</p>
              {product.isBestSeller && <span className="best-seller-badge">Best Seller</span>}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Products;