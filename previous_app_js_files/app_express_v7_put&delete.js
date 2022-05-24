const express = require('express')
const app = express()
let { people } = require('./data')

// static assets
app.use(express.static('./methods-public'))

// parse form data
app.use(express.urlencoded({ extended: false }))
    // adds to req.body with body parser
    // 'extended: false' flag has to do with which query parser library is used (NOT THAT IMPORTANT)

// parse json data
app.use(express.json())

app.get('/api/people', (req, res) => {
    res.status(200).json({ success: true, data: people })
})

app.post('/api/people', (req, res) => {
    const { name } = req.body
    if (!name) {
        return res
            .status(400)
            .json({ success: false, msg: 'please provide name value' })
    }
    res.status(201).json({ success: true, person: name })
})

app.post('/api/postman/people', (req, res) => {
    const { name } = req.body
    if (!name) {
        return res
            .status(400)
            .json({ success: false, msg: 'please provide name value' })
    }
    res.status(201).json({ success: true, data: [...people, { id: (people.length + 1), name: name }] })
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

app.put('/api/people/:id', (req, res) => { // can call id whatever we want
    const { id } = req.params
    const { name } = req.body

    const person = people.find((person) => person.id === Number(id))

    if (!person) {
        return res
            .status(404)
            .json({ success: false, msg: `no person with id ${id}` })
    }

    const newPeople = people.map((person) => {
        if (person.id === Number(id)) {
            person.name = name
        }
        return person
    })
    res.status(200).json({ success: true, data: newPeople })
})

app.delete('/api/people/:id', (req, res) => {

    const person = people.find((person) => person.id === Number(req.params.id))

    if (!person) {
        return res
            .status(404)
            .json({ success: false, msg: `no person with id ${req.params.id}` })
    }

    const newPeople = people.filter((person) => person.id !== Number(req.params.id))
    res
        .status(200)
        .json({ success: true, data: newPeople })

})

app.listen(5000, () => {
    console.log('server is listening on port 5000...')
})