import app from "./app.js";
import Razorpay from "razorpay";
import connectDB from "./database/db.js";

app.get("/", (req, res) => {
  res.send("<h1>Congratulations!😎🥰😍 Server is Working</h1>");
});

connectDB();

export const instance = new Razorpay({
    key_id:process.env.RAZORPAY_API_KEY,
    key_secret:process.env.RAZORPAY_API_SECRET
})
app.listen(process.env.PORT, () => {
  console.log(`Server is Running on PORT : ${process.env.PORT}`);
});
