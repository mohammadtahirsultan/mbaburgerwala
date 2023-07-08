import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.js";
import passport from "passport";

const connectPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE__CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async function (accessToken, refreshToken, profile, done) {
        const user = await User.findOne({
          googleId: profile.id,
          // name: profile.displayName,
        });

        if (!user) {
          const newUser = await User.create({
            googleId:profile.id,
            name:profile.displayName,
            photo:profile.photos[0].value
          });
          return done(null, newUser);
        } else {
          return done(null, user);
        }
        
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};



export default connectPassport