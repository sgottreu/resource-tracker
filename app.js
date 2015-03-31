var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

var engine = require('ejs-locals');
app.engine('ejs', engine);
app.set('view engine', 'ejs');

var planets = require('./planets');

app.locals.planet_names = require('./planets').names;
app.locals.resources = require('./planets').resources;
app.locals.planetary_resources = require('./planets').planetary_resources;

app.get('/', function(req, res) {
  var html = planets.buildForm();

  res.render('index', { 
    title: 'Resource Tracker',
    form: html
  });
});

app.get('/getPlanets', function(req, res) {
  res.set('Content-Type', 'application/json');
  res.send(app.locals.planet_names);
  res.end();
});

app.get('/getResources', function(req, res) {
  res.set('Content-Type', 'application/json');
  res.send(app.locals.resources);
  res.end();
});

app.get('/getPlanetResources', function(req, res) {
  res.set('Content-Type', 'application/json');
  res.send(app.locals.planetary_resources);
  res.end();
});

var port = process.env.PORT || 8080;
var host = process.env.HOST || '0.0.0.0';
app.listen(port, host, function() {
    console.log('Listening on port %d', port);
});