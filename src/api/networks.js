'use strict';
var Docker = require('dockerode');
var docker = new Docker({
    socketPath: '/var/run/docker.sock'
});

module.exports.list = function (req, res, next) {
    docker.listNetworks(function (err, networks) {
        if (err) {
            res.status(err.statusCode);
            res.send(err.json);
            return next();
        }

        res.send(networks);
        return next();
    });
};

module.exports.get = function (req, res, next) {
    var id = req.params["networkId"];
    docker.getNetwork(id).inspect(function (err, network) {
        if (err) {
            res.status(err.statusCode);
            res.send(err.json);
            return next();
        }

        res.send(network);
        return next();
    });
};

module.exports.post = function (req, res, next) {
    var data = {
        Name: req.body.name,
        Driver: req.body.driver
    };
    if (req.body.Subnet && req.body.Gateway) {
        data.IPAM = {
            Config: [{
                Subnet: req.body.Subnet,
                Gateway: req.body.Gateway
            }]
        };
    }

    docker.createNetwork(data, function (err) {
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
    var id = req.params["networkId"];
    docker.getNetwork(id).remove(function (err) {
        if (err) {
            res.status(err.statusCode);
            res.send(err.json);
            return next();
        }

        res.send(204);
        return next();
    });
};
