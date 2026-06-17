function roleMiddleware(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Permissao insuficiente" });
    }

    return next();
  };
}

export default roleMiddleware;
