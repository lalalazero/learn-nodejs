var express = require('express')

var app = express()

app.get('/', function(req, res) {
    if (req.query.user) {
        var user = req.query.user 
        res.send('your query is' + user)
        return
    }
    res.send('Hello Express')
})


app.listen(3000, function() {
    console.log('App is listening at port 3000')
})