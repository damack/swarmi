app.controller('VolumesCtrl', function ($scope, toaster, VolumesService) {
    "use strict";
    $scope.save = function () {
        var volume = new VolumesService($scope.volume);
        volume.$save(function () {
            $scope.volume = {};
            toaster.success('Volume created');
            $scope.loadData();
        }, function (error) {
            toaster.error('Error', error.data.message);
        });
    };

    $scope.del = function (id) {
        var volume = new VolumesService();
        volume.$delete({
            id: id
        }, function () {
            toaster.success('Volume deleted');
            $scope.loadData();
        }, function (error) {
            toaster.error('Error', error.data.message);
        });
    };

    $scope.loadData = function () {
        VolumesService.query({}, function (volumes) {
            $scope.volumes = volumes.Volumes;
        });
    };
    $scope.loadData();
});
