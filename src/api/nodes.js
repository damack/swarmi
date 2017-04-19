'use strict';
var Docker = require('dockerode');
var docker = new Docker({
    socketPath: '/var/run/docker.sock'
});

module.exports.list = function (req, res, next) {
    docker.listNodes(function (err, nodes) {
        if (err) {
            res.status(err.statusCode);
            res.send(err.json);
            return next();
        }

        res.send(nodes);
        return next();
    });
};

module.exports.get = function (req, res, next) {
    var id = req.params["nodeId"];
    docker.getNode(id).inspect(function (err, node) {
        if (err) {
            res.status(err.statusCode);
            res.send(err.json);
            return next();
        }

        res.send(node);
        return next();
    });
};

module.exports.put = function (req, res, next) {
    var id = req.params["nodeId"];
    var data = {
        Name: req.body.name,
        Labels: req.body.labels,
        Role: req.body.role,
        Availability: req.body.availability,
        version: req.body.version
    };

    docker.getNode(id).update(data, function (err) {
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
    var id = req.params["nodeId"];
    docker.getNode(id).remove(function (err) {
        if (err) {
            res.status(err.statusCode);
            res.send(err.json);
            return next();
        }

        res.send(204);
        return next();
    });
};
