const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
    // because we used the express.urlencoded() middleware,
    // the <form action='/login' method='POST'></form> in index.html
    // is able to post (send) data to the server from '/login' path
    // and add the data to req.body with the provided field name...
    // in our case the field name is 'name'
    const { name } = req.body; // this name value has to match field in html file
    if (name) { // name isn't empty
        return res.status(200).send(`Welcome ${name}`)
    }
    res.status(401).send('Please provide credentials.')

})

module.exports = router