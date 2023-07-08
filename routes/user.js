import express from "express";
import passport from "passport";
import { logout, myProfile,adminUsers ,adminStats} from "../controllers/user.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get(
  "/googlelogin",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get("/login", passport.authenticate("google"), (req, res) => {
  successRedirect:process.env.FRONT_END_URL
});

router.get("/me", isAuthenticated,myProfile);
router.get("/logout", logout);


router.get("/admin/users", isAuthenticated,authorizeAdmin,adminUsers);

router.get("/admin/stats", isAuthenticated,authorizeAdmin,adminStats);


export default router;
