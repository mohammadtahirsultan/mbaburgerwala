import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    hNo: {
      type: String,
      require: true,
    },
    state: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    country: {
      type: String,
      require: true,
    },
    pinCode: {
      type: Number,
      require: true,
    },
    phoneNo: {
      type: Number,
      require: true,
    },
  },
  orderItems: {
    cheeseBurger: {
      price: {
        type: Number,
        require: true,
      },
      quantity: {
        type: Number,
        require: true,
      },
    },
    vegCheeseBurger: {
      price: {
        type: Number,
        require: true,
      },
      quantity: {
        type: Number,
        require: true,
      },
    },
    burgerWithFries: {
      price: {
        type: Number,
        require: true,
      },
      quantity: {
        type: Number,
        require: true,
      },
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
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
