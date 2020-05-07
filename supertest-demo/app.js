var express = require('express')
var app = express()

var fibonacci = require('../fibonacci').fibonacci
app.get('/', function(req, res) {
    res.send('hello node.js')
})
app.get('/fib', function(req, res) {
    if (req.query.n) {
        try {
            var n = Number(req.query.n)
            var result = String(fibonacci(n))
            res.send(result)
        } catch(err) {
            res.status(500).send(err.message)
        }
        
    }
})
app.listen(3000, function() {
    console.log('app is listening port: 3000')
})
module.exports = app