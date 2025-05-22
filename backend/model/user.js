const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true },
  mobile: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  name: { type: String, default: "Guest" },
  role: { type: String, default: "user" },
  type: { type: String, default: "signin" },
  cliqcash: { type: String, default: "0" },
  giftcard: { type: String, default: "0" },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
  address: [
    {
      address: { type: String, default: "" },
      pincode: { type: String, default: "" },
    },
  ],
  orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

module.exports = mongoose.model("User", userSchema);