import ErrorHandler from "./ErrorHandler.js";

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies["connect.sid"];

  if (!token) {
    return next(new ErrorHandler("Login First", 401));
  }
  next();
};


export const authorizeAdmin = (req, res, next) => {

  if (req.user.role!=="admin") {
    return next(new ErrorHandler("Only Admin Allowed", 405));
  }
  next();
};