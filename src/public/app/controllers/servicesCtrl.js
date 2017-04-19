app.controller('ServicesCtrl', function ($scope, $q, $location, ServicesService, TasksService, NetworksService) {
    "use strict";
    $q.all([
        ServicesService.query({}).$promise,
        TasksService.query({}).$promise,
        NetworksService.query({}).$promise
    ]).then(function (responsesArray) {
        $scope.services = responsesArray[0];
        $scope.tasks = responsesArray[1];
        $scope.networks = responsesArray[2];

        for (var i = 0; i < $scope.services.length; i++) {
            var service = $scope.services[i];
            service.running = 0;
            for (var a = 0; a < $scope.tasks.length; a++) {
                var task = $scope.tasks[a];
                if (task.ServiceID === service.ID && task.Status.State === "running") {
                    service.running += 1;
                }
            }
            for (a = 0; a < service.Spec.Networks.length; a++) {
                for (var key in $scope.networks) {
                    if ($scope.networks[key].Id === service.Spec.Networks[a].Target) {
                        service.Spec.Networks[a].Target = $scope.networks[key].Name
                    }
                }
            }
        }
    });

    $scope.add = function () {
        $location.path("/services/create");
    };
});
