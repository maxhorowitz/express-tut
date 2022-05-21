const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    console.log(method, url, time)
    next() // passes logger middleware off to the 
        // next middleware, which in the case below
        // passes off to the callback function defined
        // in app.get('/', logger, [NEXT FUNCTION])
}

module.exports = logger