app.factory('ServiceTasksService', function ($resource) {
    'use strict';
    return $resource('/services/:serviceId/tasks/:taskId', {
        serviceId: '@serviceId',
        taskId: '@taskId'
    });
});
