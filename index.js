var express = require('express');
var bodyParser = require('body-parser');
var db = require('mysql');

var connection = db.createConnection({
    user: 'sumorocker',
    host: '127.0.0.1',
    database: 'addressbook'
});

var app = express();
app.use(bodyParser.json());

app.use(function(req, res, next) {
    req.accountId = 1;
    next()
})

app.get('/AddressBook/:accountId', function(req, res) {
    connection.query('select * from Account where id ='+ req.accountId,
        function(err, accountInfo) {
            if (err) {
                console.log(err)
            }else if(accountInfo) {
                console.log(accountInfo)
            }
        })
});

// connection.end();

// app.get('...

var server = app.listen(process.env.PORT, process.env.IP, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});