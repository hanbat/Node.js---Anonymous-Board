var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var list = require('./routes/list');
var users = require('./routes/users');

var read = require('./routes/read');
var update = require('./routes/update');
var remove = require('./routes/delete');
var create = require('./routes/create');


var app = express();
var $ = require('jquery');
var orm = require('orm');



//ORM

app.use(orm.express("mysql://root:@localhost/test", {

    define: function (db, models, next) {
        models.board = db.define("board", { 
            title   : String,
            nickname: String,
            content : String,
            ip_address: String
         }, {
            methods: {
                getTitle: function(){
                    return this.title;
                }
            }
         });
        next();
    }

}));

app.get("/test", function(req, res){
    req.models.board.find({title: "test1"}, function(err, item){
        console.log('hmm...');
        console.log('item is %d', item);
    });
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', list);
app.use('/list', list);
app.use('/users', users);

app.use('/create', create);
app.use('/read', read);
app.use('/update', update);
app.use('/delete', remove);



/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
