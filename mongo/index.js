require('./db/connect');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/lorly';
var db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.set('views', __dirname + '/view');
mongoose.connect(mongoDB, { useNewUrlParser: true });
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(express.static('public'));


app.post('/item/create', function (req, res) {
    console.log("recieved!")
    console.log(req.body);
    var item = req.body.item;
        var quantity = req.body.quantity;
        var pty = req.body.pty;

        db.collection('hurts').insertOne({ item: item, quantity: quantity, pty: pty }, function () {
            if (err) throw err;
            db.close();
        })
    res.send(req.body);
});



app.get('/', function (req, res) {
    res.sendFile(__dirname + "/view/index.html");
    db.createCollection("hurts", function (err, result) {
        if (err) throw err;
        console.log('Collection created')
        db.close();
    })
})



app.get('/retrieve/all', function (req, res) {
    db.collection('customer').find({}).toArray(function (err, docs) {
        if (err) throw err;
        res.send(docs)
        db.close();
    })

})


app.listen(8080, function () {
    console.log('Listening on port 8080');
});

exports.app = app;