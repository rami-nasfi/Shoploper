const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ msg: "Token not found" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      let errorMsg = "Invalid Token";
      if (err.name === "TokenExpiredError") {
        errorMsg = "Token expired";
      } else if (err.name === "JsonWebTokenError") {
        errorMsg = "Invalid Token";
      }

      return res.status(401).json({ msg: errorMsg });
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
