const jwt = require("jsonwebtoken");
require("dotenv").config();

let roleCheckMiddleware = (validRole) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers?.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ message: "Authorization header missing or malformed" });
      }
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECURITY_KEY);
      if (!decoded) {
        return res.status(400).json({ message: "Invalid Token" });
      }
      let role = decoded.role;
      if (validRole==role) {
        req.user = decoded.userId;
        next();
      }else{
          res.status(400).json({ message: "Unathorized" });
      }
    } catch (error) {
      if (error.message === "jwt expired") {
        return res
          .status(401)
          .json({ message: "Token expired, please login again" });
      }
      return res
        .status(401)
        .json({ message: "Invalid token", error: error.message });
    }
  };
};
module.exports = roleCheckMiddleware;
