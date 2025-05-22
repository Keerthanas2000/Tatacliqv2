import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CartDetails() {
  const cartItems = useSelector((state) => state.cart?.cartItems || []);

  console.log("state", cartItems);
  const cartCounter = useSelector((state) => state.cart.cartCounter);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const deliveryCharges = useSelector((state) => state.cart.deliveryCharges);
  const taxes = useSelector((state) => state.cart.taxes);
  const grandTotal = useSelector((state) => state.cart.grandTotal);

  return (
    <div className="container bg-white mt-5">
      {cartItems?.length > 0 ? (
        <div className="row mt-5">
          <h3 className="border-bottom py-2 mb-3">Shopping Cart</h3>

          <div className="col-md-8 shadow">
            <div className="row border-bottom py-3 fw-bold">
              <div className="col-md-9">Item</div>
              <div className="col-md-1">Cost</div>
              <div className="col-md-1">Qty</div>
              <div className="col-md-1">Total</div>
            </div>

            {cartItems.map((item) => (
              <div className="row py-4 border-bottom" key={item.id}>
                <div className="col-md-9 d-flex align-items-center">
                  <img
                    src={cartItems[0].images[0]}
                    alt={item.title}
                    style={{ width: "100px", height: "100px" }}
                  />
                  <h6 className="ps-3 mb-0">{item.title}</h6>
                </div>
                <div className="col-md-1 text-end">
                  <p>{item.price}</p>
                </div>
                <div className="col-md-1 text-end">
                  <p>{item.quantity}</p>
                </div>
                <div className="col-md-1 text-end">
                  <p>{item.total_item_price.toFixed(2)}</p>
                </div>
              </div>
            ))}

            {/* Totals Row */}
            <div className="row mb-2 py-3 pe-3">
              <div className="offset-md-9 col-md-1 text-end">
                <h5>Total</h5>
              </div>
              <div className="col-md-1 text-end">
                <h5>{cartCounter}</h5>
              </div>
              <div className="col-md-1 text-center">
                <h5>{totalPrice.toFixed(2)}</h5>
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="col-md-4">
            <div className="shadow p-3 mx-2 pb-4">
              <div className="d-flex justify-content-between px-2">
                <p>Sub Total</p>
                <p>{totalPrice.toFixed(2)}</p>
              </div>
              <div className="d-flex justify-content-between px-2">
                <p>Delivery Charges</p>
                <p>{deliveryCharges.toFixed(2)}</p>
              </div>
              <div className="d-flex justify-content-between px-2">
                <p>Tax</p>
                <p>{taxes.toFixed(2)}</p>
              </div>
              <div className="d-flex justify-content-between px-2 fw-bold border-top pt-2">
                <p>Total</p>
                <p>{grandTotal.toFixed(2)}</p>
              </div>
              <div className="d-flex justify-content-between px-2 fw-bold border-top pt-2">
                <>&nbsp;</>
                <Link className="float-end btn btn-success mt-7" to="/payment">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-center mt-5 pt-5">
          Your bag is empty! Let’s fill it up shall we?
        </h1>
      )}
    </div>
  );
}

export default CartDetails;
