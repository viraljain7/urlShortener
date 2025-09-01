const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
  
    if (!statusCode) statusCode = 500;
    if (!message) message = "Something went wrong.";
  
    console.error("Error:", err);
  
    res.status(statusCode).json({
      status: "error",
      statusCode: statusCode,
      message: message
    });
  };
  
  export { errorHandler };