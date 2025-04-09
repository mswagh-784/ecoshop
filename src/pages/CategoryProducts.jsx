import { useParams, Link } from 'react-router-dom';
import '../css/products.css';

function CategoryProducts() {
  const { categoryId } = useParams();

  // Mock category-specific products
  const products = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: `${getCategoryName(categoryId)} Product ${i + 1}`,
    price: (49.99 + (i * 10)).toFixed(2),
    image: 'https://via.placeholder.com/300',
    category: getCategoryName(categoryId)
  }));

  function getCategoryName(id) {
    const categories = {
      '1': 'Electronics',
      '2': 'Clothing',
      '3': 'Home & Garden',
      '4': 'Beauty',
      '5': 'Sports',
      '6': 'Books'
    };
    return categories[id] || 'Unknown Category';
  }

  return (
    <div className="category-products-page">
      <h1>{getCategoryName(categoryId)}</h1>
      <div className="products-grid">
        {products.map(product => (
          <Link to={`/products/${product.id}`} key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryProducts;
