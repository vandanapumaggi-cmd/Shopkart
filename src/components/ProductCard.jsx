import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    // Add product to cart first, then open payment
    addToCart(product);
    // REPLACE WITH YOUR RAZORPAY LINK
    window.open("https://rzp.io/l/YOUR_PAYMENT_LINK_HERE", "_blank");
  };

  const formatPrice = (price) => `₹${price}`;

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <span className="badge">{product.badge}</span>
        <button className="quick-view" onClick={() => onQuickView(product)}>
          Quick View
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{formatPrice(product.price)}</p>

        {/* MERGED BUTTONS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            className={`add-to-cart-btn ${added ? "added" : ""}`}
            onClick={handleAdd}
          >
            {added ? "✓ Added" : "Add to Cart"}
          </button>

          <button
            className="buy-now-btn"
            onClick={handleBuyNow}
            style={{
              background: '#16a34a',
              color: 'white',
              padding: '10px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Buy Now - Pay
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;