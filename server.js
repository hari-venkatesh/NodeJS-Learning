
var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

mongoose.Promise = Promise

var message = mongoose.model('Message', {
    name: String,
    message: String
})

app.get('/message', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages)
    })
})

app.get('/messages/:user', (req, res) => {
    var user = req.params.user
    Message.find({name: user}, (err, messages) => {
        res.send(messages)
    })
})

app.post('/message', (req, res) => {
    message.push(req.body)
    res.sendStatus(200)
})


var server = app.listen(3000, () => {
    console.log('Server is on', server.address().port)
})


