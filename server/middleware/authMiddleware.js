const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
    try {
    // Get Authorization Header
    const authHeader = req.headers.authorization;

    // Check if token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized. No token provided",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Save user id in request
    // Get latest user details from database
const user = await User.findById(decoded.id).select("-password");

if (!user) {
  return res.status(401).json({
    message: "User not found",
  });
}

req.user = user;
    // Continue to next middleware or route
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

// Role-Based Authorization
const authorize = (...roles) => {
  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied. You do not have permission."
      });
    }

    next();

  };
};

module.exports = {
  protect,
  authorize,
};