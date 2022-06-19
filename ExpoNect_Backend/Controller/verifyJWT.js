const jwt = require("jsonwebtoken");
require("dotenv").config();
const expressJwt = require("express-jwt-token");

const verifyJWT = (req, res, next) => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  console.log(authHeader);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    next();
  });
};

module.exports = verifyJWT;
