import { contactUs } from "../controllers/contact.js";

import express from "express";


const router = express.Router();
router.post("/contact", contactUs);


export default router;