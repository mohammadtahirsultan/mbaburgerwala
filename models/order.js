import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    hNo: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
  },
  orderItems: {
    cheeseBurger: {
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
    vegCheeseBurger: {
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
    burgerWithFries: {
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "Online"],
    default: "COD",
  },
  paymentInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
  },
  paidAt: Date,

  itemsPrice: {
    type: Number,
    default: 0,
  },

  tax: {
    type: Number,
    default: 0,
  },

  shippingCharges: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
  orderStatus: {
    type: String,
    enum: ["Processing", "Shipped", "Delivered"],
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
