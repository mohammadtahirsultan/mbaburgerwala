import express from "express";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import { myOrders, placeOrder,placeOrderOnline,orderDetails, adminOrders, processOrder, paymentVerification } from "../controllers/order.js";

const router = express.Router();

// router.get("/admin/users", isAuthenticated,authorizeAdmin,adminUsers);
router.post("/createorder",  placeOrder);
router.post("/createorderonline",  placeOrderOnline);
router.post("/paymentverification",isAuthenticated, paymentVerification);
router.get("/myorders", myOrders);
router.get("/order/:id", orderDetails);

// Add Admin Middleware 
router.get("/admin/orders",isAuthenticated ,authorizeAdmin, adminOrders);
router.get("/admin/order/:id",isAuthenticated ,authorizeAdmin, processOrder);


export default router;
