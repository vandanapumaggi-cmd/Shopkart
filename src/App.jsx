import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { useCart } from "./context/CartContext";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toastMessage } = useCart();

  return (
    <div className="app-layout">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-col">
            <h3 className="footer-brand">🛒 ShopKart</h3>
            <p>Your one-stop destination for modern tech, gadgets, and apparel.</p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/cart">Shopping Cart</a></li>
              <li><a href="#products-heading">All Products</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact & Support</h4>
            <p>Email: support@shopkart.com</p>
            <p>Phone: +91 1800 123 4567</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ShopKart Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;