var express = require('express');
var app = express();
var request = require('request');

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', function(req, res){
   res.render('main'); 
});

app.get('/results', function(req,res){
    var q = req.query.search;
    var url = 'https://openlibrary.org/api/books?bibkeys=ISBN:' + q + '&format=json&jscmd=data';
    request(url, function(error, response, dataStream){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(dataStream);
            res.render('result', {data:data, query:q});
        }
    });
});

app.get('*', function(req,res){
   res.render('error'); 
});

app.listen(process.env.PORT || 3000, function(){
   console.log('Server has been started'); 
});