function notFound(req, res, next) {
  res.status(404).json({
    success: false,
    error: {
      message: `Endpoint ${req.originalUrl} not found.`
    }
  });
}

module.exports = notFound;
