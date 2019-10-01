// require('./db/connect');
var express = require('express');
var app = express();
app.set('views', __dirname + '/view');
// app.use(bodyParser.json());

app.use(express.static('public'));

// app.use('/', itemRoutes);

app.get('/item/create', function (req, res) {
      res.sendFile(__dirname+"/view/index.html");
  });

app.use('*', function(req, res) {
    res.status(404).json({ message: 'Not Found' });
});

app.listen(8080, function() {
    console.log('Listening on port 8080');
});

exports.app = app;