app.factory('NetworksService', function ($resource) {
    'use strict';
    return $resource('/networks/:id', {
        id: '@_id'
    });
});
