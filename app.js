var express = require('express')
var superagent = require('superagent')
var cheerio = require('cheerio')
var eventproxy = require('eventproxy');
var url = require('url')

var cnodeUrl = 'https://cnodejs.org/';

var app = express()
var multer = require('multer') // for parsing multipart/form-data
var upload = multer({ dest: 'uploads/' })

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
    if (req.query.user) {
        var user = req.query.user
        res.send('your query is' + user)
        return
    }
    res.send('Hello Express')
})

app.get('/crawler', function (req, res, next) {
    superagent.get(cnodeUrl)
        .end(function (err, sres) {
            if (err) {
                return next(err)
            }
            var $ = cheerio.load(sres.text)
            var items = []
            var topicUrls = []
            $('#topic_list .topic_title').each(function (idx, element) {
                var $element = $(element)
                var href = url.resolve(cnodeUrl, $element.attr('href'));
                topicUrls.push(href);
                items.push({
                    title: $element.attr('title'),
                    href: $element.attr('href')
                })
            })

            getComments(topicUrls)

            res.setHeader('Access-Control-Allow-Origin', '*')
            res.json(items)


        })
})


app.post('/profile', upload.none(), function (req, res, next) {
    console.log(req.query)
    console.log(req.body)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.json(req.body)
})


app.listen(3000, function () {
    console.log('App is listening at port 3000')
})

function getComments(topicUrls) {
    var ep = new eventproxy()

    ep.after('get-comment', topicUrls.length, function (topics) {
        var withComments = topics.map(function (topicPair) {
            var topicUrl = topicPair[0]
            var topicHtml = topicPair[1]
            var $ = cheerio.load(topicHtml)
            return ({
                title: $('.topic_full_title').text().trim(),
                href: topicUrl,
                comment1: $('.reply_content').eq(0).text().trim(),
            })
        })

        console.log('final---')
        console.log(withComments)
    })

    topicUrls.forEach(function (topicUrl) {
        superagent.get(topicUrl).end(function (err, res) {
            if (!err) {
                console.log('fetch ' + topicUrl + 'successfully')
                ep.emit('get-comment', [topicUrl, res.text])
            }
        })
    })
}