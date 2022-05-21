const express = require('express');
const app = express()
const { products } = require('./data')


app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1><a href="/api/products">products</a>')
})

app.get('/api/products', (req, res) => {
    const newProducts = products.map((product) => {
        const { id, name, image } = product;
        return { id, name, image }
    })
    res.json(newProducts)
})

// ':productID' (begins with a colon) parameterizes our code so we can
// extract info from the req (meaning we can extract info from what the client
// sent) -- in this case we get the productID value (we define its name)
// and then use it to serve the correct product's information
app.get('/api/products/:productID', (req, res) => {
    const singleProduct = products.find((product) => product.id === Number(req.params.productID))
    if (!singleProduct) { // makes sure the request corresponds to a defined productID
        return res.status(404).send('product does not exist')
    }
    return res.json(singleProduct)
})

app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
    console.log(req.params)
    res.send('hello world')
})

app.get('/api/v1/query', (req, res) => {
    const { search, limit } = req.query
    let sortedProducts = [...products]
    if (search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search)
        })
    }
    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }
    if (sortedProducts.length < 1) {
        // res.status(200).send('no products matched your search')
        return res.status(200).json({ success: true, data: [] })
    }
    res.status(200).json(sortedProducts)
})

app.all('*', (req, res) => {
    res.status(404).send('<h1>resource not found</h1>')
})

app.listen(5000, () => {
    console.log('server is listening on port 5000...')
})