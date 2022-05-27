function errorHandler(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "The user isnot authorized" });
  }

  if (err.name === "ValidateError") {
    return res.status(401).json({ message: err });
  }
  return res.status(500).json(err);
}
