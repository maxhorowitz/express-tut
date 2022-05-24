const express = require('express')
const app = express()
let { people } = require('./data')

// static assets
app.use(express.static('./methods-public'))

// parse form data
app.use(express.urlencoded({ extended: false }))
    // adds to req.body with body parser
    // 'extended: false' flag has to do with which query parser library is used (NOT THAT IMPORTANT)


app.get('/api/people', (req, res) => {
    res.status(200).json({ success: true, data: people })
})

app.post('/login', (req, res) => {
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

app.listen(5000, () => {
    console.log('server is listening on port 5000...')
})