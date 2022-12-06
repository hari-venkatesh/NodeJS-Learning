
var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

mongoose.set('strictQuery', false);

mongoose.Promise = Promise

var dbUrl = 'mongodb+srv://Hari:Marpata@6@cluster22.ikhomds.mongodb.net/test'

var message = mongoose.model('Message', {
    name: String,
    message: String
})

app.get('/message', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages)
    })
})

app.get('/messages/:user', async (req, res) => {
    try {
        var message = new Message(req.body)
        var savedMessage = await message.save()
        console.log('saved')
        var censored = await Message.findOne({ message: 'badword' })
        if (censored)
            await Message.remove({ _id: censored.id })
        else
            io.emit('message', req.body)
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
        return console.error(error)
    } finally {
        console.log('message post called')
    }
})

io.on('connection', (socket) => {
    console.log('a user connected')
})

mongoose.connect(dbUrl, { useMongoClient: true }, (err) => {
    console.log('mongo db connection', err)
})



var server = app.listen(3000, () => {
    console.log('Server is on', server.address().port)
})


