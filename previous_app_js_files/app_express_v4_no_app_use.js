const express = require('express');
const app = express()

// req => middleware => res

// this is an example with the logger function contained in the app.js
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

app.get('/', logger, (req, res) => {
    res.send('Home')
})

app.get('/about', (req, res) => {
    res.send('About')
})

app.listen(5000, () => {
    console.log('server is listening on port 5000...')
})