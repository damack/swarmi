app.factory('ServicesService', function ($resource) {
    'use strict';
    return $resource('/services/:id', {
        id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
});
