var { expressjwt: jwt } = require("express-jwt");

const authJwt = () => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  return jwt({
    ACCESS_TOKEN_SECRET,
    algorithms: ["HS256"],
  }).unless({
    path: ["/api/v1/importers/login"],
  });
};

module.exports = authJwt;
