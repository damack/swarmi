var app = angular.module('swarmi', ['ngRoute', 'ngResource', 'angular-loading-bar', 'toaster', 'ngAnimate', 'ui.bootstrap']);

app.config(function ($routeProvider, $httpProvider) {
    'use strict';
    $routeProvider
        .when('/dashboard', {
            templateUrl: 'app/views/dashboard.html',
            controller: 'DashboardCtrl'
        })
        .when('/nodes', {
            templateUrl: 'app/views/nodes.html',
            controller: 'NodesCtrl'
        })
        .when('/nodes/:id', {
            templateUrl: 'app/views/node.html',
            controller: 'NodeCtrl'
        })
        .when('/networks', {
            templateUrl: 'app/views/networks.html',
            controller: 'NetworksCtrl'
        })
        .when('/volumes', {
            templateUrl: 'app/views/volumes.html',
            controller: 'VolumesCtrl'
        })
        .when('/services', {
            templateUrl: 'app/views/services.html',
            controller: 'ServicesCtrl'
        })
        .when('/services/:id', {
            templateUrl: 'app/views/service.html',
            controller: 'ServiceCtrl'
        })
        .otherwise({
            redirectTo: '/dashboard'
        });

    $httpProvider.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(sessionStorage.getItem('user')).token;
});

app.filter('bytes', function () {
    'use strict';
    return function (bytes, precision) {
        if (bytes === 0) {
            return '0 bytes';
        }
        if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) {
            return '-';
        }
        if (typeof precision === 'undefined') {
            precision = 1;
        }

        var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
            number = Math.floor(Math.log(bytes) / Math.log(1024)),
            val = (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision);

        return (val.match(/\.0*$/) ? val.substr(0, val.indexOf('.')) : val) + ' ' + units[number];
    };
});
app.filter('cpu', function () {
    'use strict';
    return function (cpus) {
        if (cpus === 0) {
            return 0;
        }

        return cpus / 1000000000;
    };
});
