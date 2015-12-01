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

//hardcoding user 1, to simulate being signed in as user 1
app.use(function(req, res, next) {
    req.accountId = 1;
    next()
})


app.get('/AddressBooks', function(req, res) {
    connection.query('select AddressBook.name as accountName,AddressBook.id as id from AddressBook where accountId ='+ req.accountId,
    //req.accountId becomes the hard coded version of /AddressBooks/1 basically
        function(err, accountInfo) {
            if (err) {
                console.log(err)
            }else if(accountInfo) {
                res.json(accountInfo)
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