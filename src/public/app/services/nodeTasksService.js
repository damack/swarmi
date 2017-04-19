app.factory('NodeTasksService', function ($resource) {
    'use strict';
    return $resource('/nodes/:nodeId/tasks/:taskId', {
        nodeId: '@nodeId',
        taskId: '@taskId'
    });
});
