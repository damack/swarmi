app.controller('NodesCtrl', function ($scope, NodesService) {
    "use strict";
    NodesService.query({}, function (nodes) {
        $scope.nodes = nodes;

        $scope.swarm = {};
        $scope.swarm.cpu = 0;
        $scope.swarm.memory = 0;
        for (var key in $scope.nodes) {
            if (key.search(/\$/) === -1) {
                $scope.swarm.cpu += $scope.nodes[key].Description.Resources.NanoCPUs;
                $scope.swarm.memory += $scope.nodes[key].Description.Resources.MemoryBytes;
            }
        }
    });
});
