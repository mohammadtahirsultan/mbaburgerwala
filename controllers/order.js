import crypto from "crypto";
import ErrorHandler from "../middlewares/ErrorHandler.js";
import Order from "../models/order.js";
import Payment from "../models/Payment.js";
import { instance } from "../server.js";


export const placeOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentMethod,
      paymentInfo,
      shippingCharges,
      tax,
      itemsPrice,
      total,
    } = req.body;

    const user = "req.user._id";

    const orderOptions = {
      shippingInfo,
      orderItems,
      paymentMethod,
      paymentInfo,
      shippingCharges,
      tax,
      itemsPrice,
      total,
      user,
    };

    await Order.create(orderOptions);

    res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};

export const placeOrderOnline = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentMethod,
      paymentInfo,
      shippingCharges,
      tax,
      itemsPrice,
      total,
    } = req.body;

    const user =" req.user._id";

    const orderOptions = {
      shippingInfo,
      orderItems,
      paymentMethod,
      paymentInfo,
      shippingCharges,
      tax,
      itemsPrice,
      total,
      user,
    };

    const options = {
      amount: Number(total) * 100,
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    res.status(201).json({
      success: true,
      order,
      orderOptions,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};

export const paymentVerification = async (req, res, next) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      orderOptions,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_API_SECRET)
      .update(body)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;
    if (isAuthentic) {
      const payment = await Payment.create({
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      });

      await Order.create({
        ...orderOptions,
        paidAt: new Date(Date.now()),
        paymentInfo: payment._id,
      });

      return res.status(201).json({
        success: true,
        message: "Order Placed Successfully",
      });
    } else {
      return next(new ErrorHandler("Payment Failed", 400));
    }
  
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};

export const myOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).populate("user", "name");
  
    res.status(200).json({
      success: true,
      orders,
    });
  
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};

export const orderDetails = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name");
    if (!order) {
      return next(new ErrorHandler("Invalid Id, Order Not Found", 400));
    } else {
      res.status(200).json({
        success: true,
        order,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};

export const adminOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate("user", "name");
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};

export const processOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order)
      return next(new ErrorHandler("Invalid Id, Order Not Found", 404));

    // Chnaging the Order Status
    if (order.orderStatus === "Processing") order.orderStatus = "Shipped";
    else if (order.orderStatus === "Shipped") {
      order.orderStatus = "Delivered";
      order.deliveredAt = new Date(Date.now());
    } else if (order.orderStatus === "Delivered")
      return next(new ErrorHandler("Order is Already Delivered!", 400));

    await order.save();

    res.status(200).json({
      success: true,
      message: "Status Updates Successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};
