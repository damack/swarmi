app.factory('TasksService', function ($resource) {
    'use strict';
    return $resource('/tasks');
});
