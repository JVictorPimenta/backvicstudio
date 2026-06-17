function notFoundMiddleware(req, res) {
  return res.status(404).json({ message: "Rota nao encontrada" });
}

export default notFoundMiddleware;
