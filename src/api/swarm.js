'use strict';
var Docker = require('dockerode');
var docker = new Docker({
    socketPath: '/var/run/docker.sock'
});

module.exports.get = function (req, res, next) {
    docker.swarmInspect(function (err, swarm) {
        if (err) {
            res.status(err.statusCode);
            res.send(err.json);
            return next();
        }

        res.send(swarm);
        return next();
    });
};
