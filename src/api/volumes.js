'use strict';
var Docker = require('dockerode');
var docker = new Docker({
    socketPath: '/var/run/docker.sock'
});

module.exports.list = function (req, res, next) {
    docker.listVolumes(function (err, volumes) {
        if (err) {
            res.status(err.statusCode);
            res.send(err.json);
            return next();
        }

        res.send(volumes);
        return next();
    });
};

module.exports.get = function (req, res, next) {
    var id = req.params["volumeId"];
    docker.getVolume(id).inspect(function (err, volume) {
        if (err) {
            res.status(err.statusCode);
            res.send(err.json);
            return next();
        }

        res.send(volume);
        return next();
    });
};

module.exports.post = function (req, res, next) {
    var data = {
        Name: req.body.name,
        Driver: req.body.driver
    };

    docker.createVolume(data, function (err) {
        if (err) {
            res.status(err.statusCode);
            res.send(err.json);
            return next();
        }

        res.send(201);
        return next();
    });
};

module.exports.del = function (req, res, next) {
    var id = req.params["volumeId"];
    docker.getVolume(id).remove(function (err) {
        if (err) {
            res.status(err.statusCode);
            res.send(err.json);
            return next();
        }

        res.send(204);
        return next();
    });
};
