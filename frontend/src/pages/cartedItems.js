import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { addTocart, removeProd, addToWishlist } from "../actions/CartActions";
function CartDetails() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const deliveryCharges = useSelector((state) => state.cart.deliveryCharges);
  const taxes = useSelector((state) => state.cart.taxes);
  const grandTotal = useSelector((state) => state.cart.grandTotal);

  const handleIncreaseQuantity = (item) => {
    dispatch(addTocart(item));
  };

  const handleWishlistToggle = (item) => {
    dispatch(addToWishlist(item));
  };
  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(removeProd(item));
    }
  };

  const handleRemoveItem = (item) => {
    dispatch(removeProd(item, true)); 
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "1200px" }}>
      {cartItems?.length > 0 ? (
        <div className="row" style={{ marginTop: "120px" }}>
          <div className="col-md-8 pe-4">
            <h4 className="mb-4 fw-bold">My Bag</h4>

            {cartItems.length > 0 && (
              <div className="alert alert-info mb-4">
                Get this order at ₹{grandTotal.toFixed(2)} only!
              </div>
            )}

            <div className="card mb-3 p-3">
              {cartItems.map((item) => (
                <div key={item._id} className="border-bottom pb-3 mb-3">
                  <div className="d-flex">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="me-3"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{item.title}</h6>
                      <div className="d-flex justify-content-between mb-2">
                        <div>
                          <span className="text-danger fw-bold">
                            ₹{item.price.toFixed(2)}
                          </span>
                          <span className="text-decoration-line-through text-muted ms-2">
                            ₹{(item.price * 1.25).toFixed(2)}
                          </span>
                          <span className="text-success ms-2">
                            {Math.round(
                              (1 - item.price / (item.price * 1.25)) * 100
                            )}
                            % Off
                          </span>
                        </div>
                      </div>

                      <div className="mb-2">
                        <small className="text-muted">
                          Color: {item.color || "N/A"}
                        </small>
                      </div>

                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <span className="me-2">
                            Size: {item.size || "UK/MID-9"}
                          </span>
                        </div>

                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleDecreaseQuantity(item)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleIncreaseQuantity(item)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mt-2">
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => handleRemoveItem(item)}
                    >
                      Remove
                    </button>
                    <button
                      onClick={handleWishlistToggle}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Save to wishlist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="col-md-4">
            <div className="card p-3">
              <h6 className="mb-3 fw-bold">Order Summary</h6>

              <div className="d-flex justify-content-between mb-2">
                <span>Bag Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Processing Fee</span>
                <span className="text-success">FREE</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Bag Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>

              {/* <div className="d-flex justify-content-between mb-3 text-success">
                <span>Product Discount(s)</span>
                <span>-₹{(cartItems.length *100).toFixed(2)}</span>
              </div> */}

              <div className="border-top pt-3 mb-3">
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                {/* <small className="text-muted">
                  You will save ₹{(totalPrice * 0.2).toFixed(2)} on this order
                </small> */}
              </div>

              <Link
                to="/payment"
                className="btn btn-danger w-100 py-2"
                style={{ backgroundColor: "#ff3e6c", border: "none" }}
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-5">
          <h4 className="mb-3">Your bag is empty!</h4>
          <p className="text-muted mb-4">Let's fill it up shall we?</p>
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}

export default CartDetails;
