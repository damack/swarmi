app.controller('NodeCtrl', function ($scope, $routeParams, $q, toaster, NodesService, NodeTasksService) {
    "use strict";
    $q.all([
        NodesService.get({
            id: $routeParams.id
        }).$promise,
        NodeTasksService.query({
            nodeId: $routeParams.id
        }).$promise
    ]).then(function (responsesArray) {
        $scope.node = responsesArray[0];
        $scope.tasks = responsesArray[1];
    });

    $scope.save = function () {
        var data = {
            version: $scope.node.Version.Index,
            name: $scope.node.Spec.Name,
            availability: $scope.node.Spec.Availability,
            role: $scope.node.Spec.Role,
            labels: $scope.node.Spec.Labels
        };

        NodesService.update({
            id: $routeParams.id
        }, data, function () {
            toaster.success('Node updated successfully');
        }, function (error) {
            toaster.error('Error', error.data.message);
        });
    };

    $scope.addLabel = function () {
        if (!$scope.node.Spec.hasOwnProperty("Labels")) {
            $scope.node.Spec.Labels = {};
        }

        $scope.node.Spec.Labels[$scope.label.name] = $scope.label.value;
        $scope.label = {};
    };

    $scope.delLabel = function (key) {
        delete $scope.node.Spec.Labels[key];
    };
});
