var express = require('express')
var app = express()
var multer = require('multer') // for parsing multipart/form-data
var upload = multer({ dest: 'uploads/' })

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res) {
    if (req.query.user) {
        var user = req.query.user 
        res.send('your query is' + user)
        return
    }
    res.send('Hello Express')
})

app.post('/profile', upload.none(), function (req, res, next) {
  console.log(req.query)
  console.log(req.body)
  res.setHeader('Access-Control-Allow-Origin','*')
  res.json(req.body)
})


app.listen(3000, function() {
    console.log('App is listening at port 3000')
})