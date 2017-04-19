app.controller('DashboardCtrl', function ($scope, $q, NodesService, NetworksService, ServicesService) {
    "use strict";
    $q.all([
        NodesService.query({}).$promise,
        NetworksService.query({}).$promise,
        ServicesService.query({}).$promise
    ]).then(function (responsesArray) {
        $scope.nodes = responsesArray[0];
        $scope.networks = responsesArray[1];
        $scope.services = responsesArray[2];
        $scope.templates = [];

        $scope.node = {};
        $scope.node.red = 0;
        $scope.node.green = 0;
        $scope.swarm = {};
        $scope.swarm.cpu = 0;
        $scope.swarm.memory = 0;
        for (var key in $scope.nodes) {
            if (key.search(/\$/) === -1) {
                if ($scope.nodes[key].Status.State === "ready") {
                    $scope.node.green++;
                } else {
                    $scope.node.red++;
                }

                $scope.swarm.cpu += $scope.nodes[key].Description.Resources.NanoCPUs;
                $scope.swarm.memory += $scope.nodes[key].Description.Resources.MemoryBytes;
            }
        }

        $scope.service = {};
        $scope.service.red = 0;
        $scope.service.green = 0;
        for (key in $scope.services) {
            if (key.search(/\$/) === -1) {
                /*
                if ($scope.services[key].Status.State === "ready") {
                    $scope.service.green++;
                } else {
                    $scope.service.red++;
                }*/
            }
        }
    });
});
