'use strict';
var Docker = require('dockerode');
var docker = new Docker({
    socketPath: '/var/run/docker.sock'
});

module.exports.list = function (req, res, next) {
    docker.listServices(function (err, services) {
        if (err) {
            res.status(err.statusCode);
            res.send(err.json);
            return next();
        }

        res.send(services);
        return next();
    });
};

module.exports.post = function (req, res, next) {
    docker.createService(req.body, function (err, service) {
        if (err) {
            res.status(err.statusCode);
            res.send(err.json);
            return next();
        }

        res.status(201);
        res.send(service);
        return next();
    });
};

module.exports.get = function (req, res, next) {
    var id = req.params["serviceId"];
    docker.getService(id).inspect(function (err, service) {
        if (err) {
            res.status(err.statusCode);
            res.send(err.json);
            return next();
        }

        res.send(service);
        return next();
    });
};

module.exports.put = function (req, res, next) {
    var id = req.params["serviceId"];

    docker.getService(id).update(req.body, function (err) {
        if (err) {
            res.status(err.statusCode);
            res.send(err.json);
            return next();
        }

        res.send(200);
        return next();
    });
};

module.exports.del = function (req, res, next) {
    var id = req.params["serviceId"];
    docker.getService(id).remove(function (err) {
        if (err) {
            res.status(err.statusCode);
            res.send(err.json);
            return next();
        }

        res.send(204);
        return next();
    });
};
