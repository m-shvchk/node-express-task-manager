const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
      // here we are passing error handling to the next middleware at app.js
      // the position of all app.use() in app.js is important!
      // next() is obligatory if we don't send response from the middleware
    }
  };
};
module.exports = asyncWrapper;
