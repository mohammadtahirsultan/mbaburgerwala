import express from "express";
import { config } from "dotenv";
const app = express();
import userRoutes from "./routes/user.js";
import orderRoutes from "./routes/order.js";
import ConnectPassport from "./utils/Provider.js";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cors from "cors";
import contactRoute from './routes/contact.js'
config({ path: "./config.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
      httpOnly: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
      sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? false : "none",
    },
  })
);

app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");


app.use(cookieParser());
ConnectPassport();

// using Middlewares
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use("/api/v1", userRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", contactRoute);

app.use(errorMiddleware);

export default app;
