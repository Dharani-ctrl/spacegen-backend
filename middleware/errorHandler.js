export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;

  console.error("🔥 Error:", err);

  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;