app.factory('VolumesService', function ($resource) {
    'use strict';
    return $resource('/volumes/:id', {
        id: '@_id'
    }, {
        'query': {
            method: 'GET',
            isArray: false
        }
    });
});
