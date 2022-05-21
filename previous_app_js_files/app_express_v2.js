const express = require('express');
const path = require('path')

const app = express()


// setup static and middleware
app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))

    // adding to static assets
    // OR
    // server-side-rendering (use template engine for that)
})

app.all('*', (req, res) => {
    res.status(404).send('<h1>resource not found</h1>')
})

app.listen(5000, () => {
    console.log('server is listening on port 5000...')
})

// app.get -- read data
// app.post -- insert data
// app.put -- update data
// app.delete -- delete data
// app.all -- all works with all of the above
// app.use -- middleware
// app.listen -- binds itself with specified host and port to bind and listen  for any connections