import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    shippingFee,
    cartTax,
    cartTotal,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "upi",
  });

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError("");
    setPromoSuccess("");

    if (promoCode.trim().toUpperCase() === "SAVE10") {
      const discAmount = Math.round(cartSubtotal * 0.1);
      setDiscount(discAmount);
      setPromoSuccess("Promo code SAVE10 applied! 10% discount added.");
    } else if (promoCode.trim().toUpperCase() === "FLAT500") {
      setDiscount(500);
      setPromoSuccess("Promo code FLAT500 applied! ₹500 discount added.");
    } else {
      setPromoError("Invalid promo code. Try 'SAVE10' or 'FLAT500'.");
    }
  };

  const finalTotal = Math.max(0, cartTotal - discount);

  const handleFormChange = (e) => {
    setCheckoutForm({ ...checkoutForm, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!checkoutForm.name || !checkoutForm.address || !checkoutForm.pincode) {
      alert("Please fill in all required shipping fields.");
      return;
    }
    setOrderPlaced(true);
  };

  const handleCloseModal = () => {
    if (orderPlaced) {
      clearCart();
      setOrderPlaced(false);
      setShowCheckoutModal(false);
    } else {
      setShowCheckoutModal(false);
    }
  };

  const formatPrice = (amount) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="empty-cart-page">
        <div className="empty-cart-card">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any items to your shopping cart yet.</p>
          <Link to="/" className="primary-cta-btn">
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <div className="cart-header">
        <h1>Your Shopping Cart</h1>
        <p>{cartItems.reduce((acc, item) => acc + item.quantity, 0)} item(s) in your cart</p>
      </div>

      <div className="cart-layout">
        {/* Cart Items List */}
        <div className="cart-items-section">
          <div className="cart-items-header">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
            <span>Action</span>
          </div>

          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-row">
                <div className="item-info">
                  <img src={item.image} alt={item.name} className="item-thumb" />
                  <div>
                    <h4 className="item-name">{item.name}</h4>
                    <span className="item-category">{item.category}</span>
                  </div>
                </div>

                <div className="item-price">{formatPrice(item.price)}</div>

                <div className="quantity-controls">
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>

                <div className="item-subtotal">
                  {formatPrice(item.price * item.quantity)}
                </div>

                <button
                  className="remove-item-btn"
                  onClick={() => removeFromCart(item.id)}
                  title="Remove item"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <div className="cart-actions-bar">
            <Link to="/" className="continue-shopping-link">
              ← Continue Shopping
            </Link>
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Entire Cart
            </button>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="cart-summary-section">
          <div className="summary-card">
            <h3>Order Summary</h3>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="promo-form">
              <div className="promo-input-group">
                <input
                  type="text"
                  placeholder="Promo code (SAVE10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button type="submit">Apply</button>
              </div>
              {promoError && <p className="promo-message error">{promoError}</p>}
              {promoSuccess && <p className="promo-message success">{promoSuccess}</p>}
            </form>

            <div className="summary-rows">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="free-shipping">FREE</span>
                  ) : (
                    formatPrice(shippingFee)
                  )}
                </span>
              </div>
              <div className="summary-row">
                <span>Estimated Tax (5%)</span>
                <span>{formatPrice(cartTax)}</span>
              </div>

              {discount > 0 && (
                <div className="summary-row discount-row">
                  <span>Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="summary-divider"></div>

              <div className="summary-row total-row">
                <span>Grand Total</span>
                <span className="total-amount">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <button
              className="checkout-btn"
              onClick={() => setShowCheckoutModal(true)}
            >
              Proceed to Checkout →
            </button>

            <div className="trust-badges">
              <span>🔒 256-Bit SSL Encrypted</span>
              <span>⚡ Fast Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseModal}>
              ✕
            </button>

            {!orderPlaced ? (
              <div className="checkout-content">
                <h2>Checkout & Shipping</h2>
                <form onSubmit={handlePlaceOrder} className="checkout-form">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={checkoutForm.name}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="rahul@example.com"
                      value={checkoutForm.email}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Delivery Address *</label>
                    <input
                      type="text"
                      name="address"
                      required
                      placeholder="Street address, apartment, suite"
                      value={checkoutForm.address}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        placeholder="Mumbai"
                        value={checkoutForm.city}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Pincode *</label>
                      <input
                        type="text"
                        name="pincode"
                        required
                        placeholder="400001"
                        value={checkoutForm.pincode}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Payment Method</label>
                    <select
                      name="paymentMethod"
                      value={checkoutForm.paymentMethod}
                      onChange={handleFormChange}
                      className="payment-select"
                    >
                      <option value="upi">UPI / GPay / PhonePe</option>
                      <option value="card">Credit / Debit Card</option>
                      <option value="netbanking">Net Banking</option>
                      <option value="cod">Cash on Delivery (COD)</option>
                    </select>
                  </div>

                  <div className="order-pay-summary">
                    <span>Total Amount to Pay:</span>
                    <strong>{formatPrice(finalTotal)}</strong>
                  </div>

                  <button type="submit" className="place-order-btn">
                    Confirm & Place Order
                  </button>
                </form>
              </div>
            ) : (
              <div className="order-success-content">
                <div className="success-icon">🎉</div>
                <h2>Order Placed Successfully!</h2>
                <p>
                  Thank you, <strong>{checkoutForm.name}</strong>! Your order has been placed.
                </p>
                <div className="order-details-box">
                  <p>Order ID: <strong>#SK-{Math.floor(100000 + Math.random() * 900000)}</strong></p>
                  <p>Payment: <strong>{checkoutForm.paymentMethod.toUpperCase()}</strong></p>
                  <p>Total Paid: <strong>{formatPrice(finalTotal)}</strong></p>
                </div>
                <button className="primary-cta-btn" onClick={handleCloseModal}>
                  Back to Home
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
