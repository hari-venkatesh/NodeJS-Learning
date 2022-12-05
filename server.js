
var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var message = {

}

app.get('/message', (req, res) => {
    res.send(message)
})

app.post('/message', (req, res) => {
    message.push(req.body)
    res.sendStatus(200)
})


var server = app.listen(3000, () => {
    console.log('Server is on', server.address().port)
})


