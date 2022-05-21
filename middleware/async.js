const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try{
            await fn(req, res, next);
        } catch(err){
            next(err) // we are passing error handling to other middleware
        }
    }
}
// next() method passes to the next middleware. 
// next() is obligatory if we don't send response from the middleware
module.exports = asyncWrapper;
