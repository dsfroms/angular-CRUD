/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    herbApi = require('./routes/herbApi');

var app = module.exports = express();

// Configuration

app.configure(function () {
//  app.set('views', __dirname + '/views');
//  app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
    app.use(app.router);
});

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// API


app.get('/api/herb', herbApi.find);
app.get('/api/herb/:id', herbApi.findById);
app.post('/api/herb', herbApi.addHerb);
app.put('/api/herb/:id', herbApi.updateHerb);
app.delete('/api/herb/:id', herbApi.deleteHerb)


// Start server

app.listen(3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
