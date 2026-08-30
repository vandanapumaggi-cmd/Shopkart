import React from "react";
import ProductList from "../components/ProductList";

const Home = ({ searchQuery }) => {
  return (
    <div className="home-container">
      {/* Hero Banner */}
      {!searchQuery && (
        <section className="hero-banner" style={{ backgroundColor: "#fef6e4" }}>
          <div className="hero-content">
            <span className="hero-tagline">✨ Summer Sale Is Live</span>
            <h1 className="hero-title" style={{ color: "blue" }}>Upgrade Your Style & Tech</h1>
            <p className="hero-subtitle" style={{ color: "pink" }}>
              Explore premium products with exclusive discounts, free shipping on orders over ₹2,000, and 100% money-back guarantee.
            </p>
            <div className="hero-cta-buttons">
              <a href="#products-heading" className="cta-btn primary-cta">
                Shop Collection
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Features Bar */}
      <div className="features-bar">
        <div className="feature-item">
          <span className="feature-icon">🚀</span>
          <div>
            <h4>Free Shipping</h4>
            <p>On orders above ₹2,000</p>
          </div>
        </div>
        <div className="feature-item">
          <span className="feature-icon">🛡️</span>
          <div>
            <h4>2 Year Warranty</h4>
            <p>100% authentic items</p>
          </div>
        </div>
        <div className="feature-item">
          <span className="feature-icon">🔄</span>
          <div>
            <h4>30 Day Returns</h4>
            <p>Hassle-free return policy</p>
          </div>
        </div>
        <div className="feature-item">
          <span className="feature-icon">💬</span>
          <div>
            <h4>24/7 Support</h4>
            <p>Dedicated customer service</p>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <section className="products-container" id="products-heading">
        <div className="section-header">
          <h2 className="section-title">
            {searchQuery ? `Search Results for "${searchQuery}"` : "Discover Our Products"}
          </h2>
          <p className="section-subtitle">
            Handpicked premium items tailored for your lifestyle.
          </p>
        </div>

        <ProductList searchQuery={searchQuery} />
      </section>
    </div>
  );
};

export default Home;
