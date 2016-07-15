/**
 * Created by zhoutengteng on 16/6/20.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var CONFIG = require('./config/config');
var filter = require('./router/filter');
var jade = require('jade');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var upload = require('jquery-file-upload-middleware');
var app = express();

app.set('views', path.join(__dirname, '/public/views'));  // 设置模板相对路径(相对当前目录)
app.set('view engine', 'jade'); // 设置模板引擎
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'lib')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(morgan('combined'));
app.set('trust proxy', 1); // trust first proxy
app.use(session({
    genid: function(req) {
        return 1; // use UUIDs for session IDs
    },
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 60000 }
}));



upload.configure({
    uploadDir: __dirname + '/public/uploads',
    uploadUrl: '/uploads',
    imageVersions: {
        thumbnail: {
            width: 80,
            height: 80
        }
    }
});
app.use('/upload', upload.fileHandler());
app.get('/upload', function( req, res ){
    res.redirect('/');
});
app.put('/upload', function( req, res ){
    res.redirect('/');
});
app.delete('/upload', function( req, res ){
    res.redirect('/');
});
app.use('/upload', function(req, res, next){
    upload.fileHandler({
        uploadDir: function () {
            return __dirname + '/public/uploads/'
        },
        uploadUrl: function () {
            return '/uploads'
        }
    })(req, res, next);
});


app.get('/', require('./router/index').getMethod);
app.get('/index', require('./router/index').getMethod);
app.post('/logout', require('./router/logout').postMethod);
app.get('/signup', require('./router/signup').getMethod);
app.post('/signup', require('./router/signup').postMethod);
app.get('/signin', require('./router/signin').getMethod);
app.post('/signin', require('./router/signin').postMethod);
app.get('/*', require('./router/validate').getMethod);
app.get('/profile/detail/[0-9]+', require('./router/detail').getMethod);
app.post('/circle/comment/[0-9]+', require('./router/detail').getComment);
app.get('/circle/edit', require('./router/circle_edit').getMethod);
app.post('/circle/comment', require('./router/detail').postComment);
app.get('/profile/[A-Za-z0-9]+', require('./router/profile').getMethod);
app.post('/circle/edit', require('./router/circle_edit').postMethod);
app.post('/circle/update', require('./router/circle_edit').updateMethod);
app.post('/profile/[A-Za-z0-9 ]+', require('./router/profile').postMethod);
app.post('/count', require('./router/profile').click);
//app.get('/activity/edit', require('./router/edit').getMethod);
app.listen(CONFIG.PORT);
console.log("server start in port 3000");