import ErrorHandler from "../middlewares/ErrorHandler.js";
import Order from "../models/order.js";
import User from "../models/user.js";
export const myProfile = (req, res) => {
  res.status(200).send({
    sucess: true,
    user: req.user,
  });
};

export const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);

    res.clearCookie("connect.sid", {
      secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
      httpOnly: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
      sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? false : "none",
    });
    res.status(200).send({
      message: "Logout Successfully",
    });
  });
};

export const adminUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};

export const adminStats = async (req, res, next) => {
  try {
    const usersCount = await User.countDocuments();

    const orders = await Order.find();

    const processingOrders = orders.filter(
      (item) => item.orderStatus === "Processing"
    );
    const shippedOrders = orders.filter(
      (item) => item.orderStatus === "Shipped"
    );
    const deliveredOrders = orders.filter(
      (item) => item.orderStatus === "Delivered"
    );

    let totalIncome = 0;

    orders.forEach((item) => {
      totalIncome += item.total;
    });

    res.status(200).json({
      success: true,
      usersCount,
      ordersCount: {
        total: orders.length,
        processing: processingOrders.length,
        shipped: shippedOrders.length,
        delivered: deliveredOrders.length,
      },
      totalIncome,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};
