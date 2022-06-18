const expressJwt = require("express-jwt-token");

function authJwt() {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  return expressJwt({
    ACCESS_TOKEN_SECRET,
    algorithms: ["HS256"],
  });
}

module.exports = authJwt;
