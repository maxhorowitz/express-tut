// THIS IS REALLY CLEVER, REALLY SHOWS THE POWER
// OF MIDDLEWARE FOR SEQUENCING IN EXPRESS

// middleware function 
const authorize = (req, res, next) => {
    const { user } = req.query;
    if (user === 'john') {
        req.user = { name: 'john', id: 3 }
        console.log('authorize')
        next()
    } else {
        res.status(401).send('unauthorized')
    }
}

module.exports = authorize