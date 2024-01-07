const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || 500,
    message: err.message || "Internal server error!",
  };

  return res.status(customError.statusCode).json({
    success: false,
    message: customError.message,
    data: null,
  });
};

export default errorHandlerMiddleware;
