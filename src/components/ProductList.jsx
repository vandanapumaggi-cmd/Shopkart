import React, { useState, useMemo } from "react";
import productsData from "../data/products";
import ProductCard from "./ProductCard";

const ProductList = ({ searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const categories = ["All", ...new Set(productsData.map((p) => p.category))];

  const filteredAndSortedProducts = useMemo(() => {
    return productsData
      .filter((product) => {
        const matchesCategory =
          selectedCategory === "All" || product.category === selectedCategory;
        const matchesSearch =
          !searchQuery ||
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0; // featured
      });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section className="product-section">
      <div className="filter-bar">
        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-tab ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="sort-wrapper">
          <label htmlFor="sort-select">Sort By:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {filteredAndSortedProducts.length === 0 ? (
        <div className="empty-products-state">
          <span className="empty-icon">🔍</span>
          <h3>No products found</h3>
          <p>Try searching for something else or reset your filters.</p>
          <button
            className="reset-btn"
            onClick={() => {
              setSelectedCategory("All");
              setSortBy("featured");
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="modal-backdrop" onClick={() => setQuickViewProduct(null)}>
          <div className="quick-view-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setQuickViewProduct(null)}
            >
              ✕
            </button>
            <div className="modal-content">
              <div className="modal-image-col">
                <img src={quickViewProduct.image} alt={quickViewProduct.name} />
              </div>
              <div className="modal-details-col">
                <span className="product-category">{quickViewProduct.category}</span>
                <h2>{quickViewProduct.name}</h2>
                <div className="product-rating">
                  <span className="stars">★ {quickViewProduct.rating}</span>
                  <span className="reviews">({quickViewProduct.reviewsCount} customer reviews)</span>
                </div>
                <div className="price-wrapper modal-price">
                  <span className="current-price">
                    ₹{quickViewProduct.price.toLocaleString("en-IN")}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="original-price">
                      ₹{quickViewProduct.originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
                <p className="modal-description">{quickViewProduct.description}</p>
                <div className="stock-status">
                  Status: <span className="in-stock">✓ In Stock & Ready to Ship</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductList;
