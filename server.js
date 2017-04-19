'use strict';
var restify = require('restify');
var passport = require('passport');
var fs = require('fs');

if (fs.existsSync(__dirname + '/src/')) {
    var folder = __dirname + "/src/";
} else {
    var folder = __dirname + "/";
}

var server = restify.createServer({
    name: 'Swarmi',
    version: '0.1.0'
});
server.use(function (req, res, next) {
    //1mb maxBodySize
    if (req.contentLength() >= 1024 * 1024) {
        return next(new restify.BadRequestError("Request body size exceeds 1mb"));
    }
    next();
});
restify.CORS.ALLOW_HEADERS.push('authorization');
server.use(restify.gzipResponse());
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.pre(restify.CORS());
server.pre(restify.fullResponse());
server.use(passport.initialize());
require(folder + 'config/passport')(passport);

//Routes
server.get('/swarm', passport.authenticate('bearer', {
    session: false
}), require(folder + 'api/swarm').get);
server.get('/nodes', passport.authenticate('bearer', {
    session: false
}), require(folder + 'api/nodes').list);
server.get('/nodes/:nodeId', passport.authenticate('bearer', {
    session: false
}), require(folder + 'api/nodes').get);
server.put('/nodes/:nodeId', passport.authenticate('bearer', {
    session: false
}), require(folder + 'api/nodes').put);
server.del('/nodes/:nodeId', passport.authenticate('bearer', {
    session: false
}), require(folder + 'api/nodes').del);
server.get('/nodes/:nodeId/tasks', passport.authenticate('bearer', {
    session: false
}), require(folder + 'api/tasks').list);
server.get('/nodes/:nodeId/tasks/:taskId', passport.authenticate('bearer', {
    session: false
}), require(folder + 'api/tasks').get);
server.get('/services', passport.authenticate('bearer', {
    session: false
}), require(folder + 'api/services').list);
server.post('/services', passport.authenticate('bearer', {
    session: false
}), require(folder + 'api/services').post);
server.get('/services/:serviceId', passport.authenticate('bearer', {
    session: false
}), require(folder + 'api/services').get);
server.put('/services/:serviceId', passport.authenticate('bearer', {
    session: false
}), require(folder + 'api/services').put);
server.del('/services/:serviceId', passport.authenticate('bearer', {
    session: false
}), require(folder + 'api/services').del);
server.get('/services/:serviceId/tasks', passport.authenticate('bearer', {
    session: false
}), require(folder + 'api/tasks').list);
server.get('/services/:serviceId/tasks/:taskId', passport.authenticate('bearer', {
    session: false
}), require(folder + 'api/tasks').get);
server.get('/networks', passport.authenticate('bearer', {
    session: false
}), require(folder + 'api/networks').list);
server.post('/networks', passport.authenticate('bearer', {
    session: false
}), require(folder + 'api/networks').post);
server.get('/networks/:networkId', passport.authenticate('bearer', {
    session: false
}), require(folder + 'api/networks').get);
server.del('/networks/:networkId', passport.authenticate('bearer', {
    session: false
}), require(folder + 'api/networks').del);
server.get('/volumes', passport.authenticate('bearer', {
    session: false
}), require(folder + 'api/volumes').list);
server.post('/volumes', passport.authenticate('bearer', {
    session: false
}), require(folder + 'api/volumes').post);
server.get('/volumes/:volumeId', passport.authenticate('bearer', {
    session: false
}), require(folder + 'api/volumes').get);
server.del('/volumes/:volumeId', passport.authenticate('bearer', {
    session: false
}), require(folder + 'api/volumes').del);
server.get('/tasks', passport.authenticate('bearer', {
    session: false
}), require(folder + 'api/tasks').list);

////////////////////////////////////////
//OAuth2
////////////////////////////////////////
server.get('/auth/github/me', passport.authenticate('bearer', {
    session: false
}), function (req, res, next) {
    res.send(req.user);
});
server.get('/auth/github', function (req, res, next) {
    passport.authenticate('github', {
        session: false
    })(req, res, next);
});
server.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/',
    session: false
}), function (req, res, next) {
    res.header('Location', '/?access_token=' + req.user.token);
    res.send(302);
    next();
});
////////////////////////////////////////

server.get(/\/?.*/, restify.serveStatic({
    directory: folder + 'public',
    default: 'index.html'
}));
server.listen(9000, function () {
    console.log('v0.1.0');
});
