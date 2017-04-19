app.controller('NetworksCtrl', function ($scope, toaster, NetworksService) {
    "use strict";
    $scope.save = function () {
        var network = new NetworksService($scope.network);
        network.$save(function () {
            $scope.network = {};
            toaster.success('Network created');
            $scope.loadData();
        }, function (error) {
            toaster.error('Error', error.data.message);
        });
    };

    $scope.del = function (id) {
        var network = new NetworksService();
        network.$delete({
            id: id
        }, function () {
            toaster.success('Network deleted');
            $scope.loadData();
        }, function (error) {
            toaster.error('Error', error.data.message);
        });
    };

    $scope.loadData = function () {
        NetworksService.query({}, function (networks) {
            $scope.networks = networks;
        });
    };
    $scope.loadData();
});
