app.factory('SwarmService', function ($resource) {
    'use strict';
    return $resource('/swarm');
});
