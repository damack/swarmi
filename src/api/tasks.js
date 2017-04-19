'use strict';
var Docker = require('dockerode');
var docker = new Docker({
    socketPath: '/var/run/docker.sock'
});

module.exports.list = function (req, res, next) {
    var nodeId = req.params["nodeId"];
    var serviceId = req.params["serviceId"];
    var filter = {};
    if (nodeId) {
        filter.node = nodeId;
    }
    if (serviceId) {
        filter.service = serviceId;
    }

    docker.listTasks(filter, function (err, tasks) {
        if (err) {
            res.status(err.statusCode);
            res.send(err.json);
            return next();
        }

        var returnTasks = [];

        for (var key in tasks) {
            if (nodeId) {
                if (tasks[key].NodeID === nodeId) {
                    returnTasks.push(tasks[key]);
                }
            } else if (serviceId) {
                if (tasks[key].ServiceID === serviceId) {
                    returnTasks.push(tasks[key]);
                }
            } else {
                returnTasks.push(tasks[key]);
            }
        }

        res.send(returnTasks);
        return next();
    });
};

module.exports.get = function (req, res, next) {
    var id = req.params["taskId"];
    docker.getTask(id).inspect(function (err, task) {
        if (err) {
            res.status(err.statusCode);
            res.send(err.json);
            return next();
        }

        res.send(task);
        return next();
    });
};
