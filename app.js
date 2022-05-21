const express = require('express');
const app = express()
const logger = require('./logger')
const authorize = require('./authorize')

// req => middleware => res

// PUT ALL OF THE MIDDLEWARE AT THE TOP OR THEY ARE NOT INCLUDED
// IN THE DEFINITIONS ABOVE THEM

// app.use adds a new middlware to the app that is
// executed between all req and res, and it is applied
// in all later defined app.get( ) definitions
app.use([logger, authorize])

// THE ORDER OF MIDDLEWARE FUNCTIONS IN ARRAY MATTERS!!!

// the following only adds the middleware to anything that comes after
// the provided path (which in this case is '/api')
// app.use('/api', logger)

app.get('/', (req, res) => { // logger will take place before
    // res returns 'Home' in this case because we have added 
    // it in app.use(logger) above
    res.send('Home')
})

app.get('/about', (req, res) => {
    res.send('About')
})

app.get('/api/products', (req, res) => {
    res.send('Products')
})

app.get('/api/items', (req, res) => {
    // middleware hidden in other modules is super cool because 
    // it can help us create (and expose for later use) attributes
    // of a request -- in this example, in 'authorize' we create the
    // user attribute as part of query string and we are now able
    // to log which user wants to navigate to the items page
    console.log(req.user)
    res.send('Items')
})

app.listen(5000, () => {
    console.log('server is listening on port 5000...')
})