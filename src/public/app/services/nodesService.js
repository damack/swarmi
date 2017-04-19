app.factory('NodesService', function ($resource) {
    'use strict';
    return $resource('/nodes/:id', {
        id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
});
