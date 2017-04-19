app.controller('ServiceCtrl', function ($scope, $routeParams, $q, $location, ServicesService, ServiceTasksService, NetworksService, toaster) {
    "use strict";
    NetworksService.query({}, function (networks) {
        $scope.networks = networks;
    });

    $scope.create = true;
    if ($routeParams.id !== "create") {
        $scope.create = false;
        $q.all([
            ServicesService.get({
                id: $routeParams.id
            }).$promise,
            ServiceTasksService.query({
                serviceId: $routeParams.id
            }).$promise
        ]).then(function (responsesArray) {
            $scope.service = responsesArray[0];
            $scope.tasks = responsesArray[1];

            if ($scope.service.Spec.Mode.Replicated) {
                $scope.service.Mode = "Replicated";
            } else {
                $scope.service.Mode = "Global";
            }
            $scope.service.Envs = [];
            for (var key in $scope.service.Spec.TaskTemplate.ContainerSpec.Env) {
                var env = $scope.service.Spec.TaskTemplate.ContainerSpec.Env[key].split("=");
                $scope.service.Envs.push({
                    name: env[0],
                    value: env[1]
                });
            }
        });
    } else {
        $scope.service = {
            Envs: [],
            Spec: {
                Name: "",
                Networks: [],
                UpdateConfig: {
                    Parallelism: 1
                },
                EndpointSpec: {
                    Ports: []
                },
                TaskTemplate: {
                    ContainerSpec: {
                        Image: ""
                    },
                    Placement: {
                        Constraints: []
                    }
                }
            }
        };
    }

    $scope.save = function () {
        var data = {
            Name: $scope.service.Spec.Name,
            Networks: $scope.service.Spec.Networks,
            UpdateConfig: {
                Parallelism: $scope.service.Spec.UpdateConfig.Parallelism,
                FailureAction: "pause"
            },
            EndpointSpec: {
                Ports: $scope.service.Spec.EndpointSpec.Ports
            },
            Mode: {},
            TaskTemplate: {
                ContainerSpec: {
                    Image: $scope.service.Spec.TaskTemplate.ContainerSpec.Image,
                    Env: []
                },
                Placement: {
                    Constraints: $scope.service.Spec.TaskTemplate.Placement.Constraints
                }
            }
        };

        if ($scope.service.Mode === "Replicated") {
            data.Mode.Replicated = {
                Replicas: $scope.service.Spec.Mode.Replicated.Replicas
            };
        } else {
            data.Mode.Global = {};
        }
        if ($scope.service.Version) {
            data.version = $scope.service.Version.Index;
        }

        for (var key in $scope.service.Envs) {
            var env = $scope.service.Envs[key];
            data.TaskTemplate.ContainerSpec.Env.push(env.name + "=" + env.value);
        }

        if ($routeParams.id !== "create") {
            ServicesService.update({
                id: $routeParams.id
            }, data, function () {
                toaster.success('Service updated successfully');
            }, function (error) {
                toaster.error('Error', error.data.message);
            });
        } else {
            var service = new ServicesService(data);
            service.$save(function (data) {
                $location.path("/services/" + data.id);
                toaster.success('Service created');
            }, function (error) {
                toaster.error('Error', error.data.message);
            });
        }
    };
    $scope.del = function () {
        $scope.service.$delete({
            id: $scope.service.ID
        }, function () {
            toaster.success('Service deleted');
            $location.path("/services");
        }, function (error) {
            toaster.error('Error', error.data.message);
        });
    };

    $scope.addPort = function () {
        $scope.service.Spec.EndpointSpec.Ports.push({
            Protocol: "tcp",
            PublishMode: "ingress",
            PublishedPort: "",
            TargetPort: ""
        });
    };
    $scope.delPort = function (PublishedPort) {
        for (var key in $scope.service.Spec.EndpointSpec.Ports) {
            if ($scope.service.Spec.EndpointSpec.Ports[key].PublishedPort === PublishedPort) {
                $scope.service.Spec.EndpointSpec.Ports.splice(key, 1);
            }
        }
    };
    $scope.addEnv = function () {
        $scope.service.Envs.push({
            name: "",
            value: ""
        });
    };
    $scope.delEnv = function (name) {
        for (var key in $scope.service.Envs) {
            if ($scope.service.Envs[key].name === name) {
                $scope.service.Envs.splice(key, 1);
            }
        }
    };
    $scope.addNetwork = function () {
        $scope.service.Spec.Networks.push({
            Target: ""
        });
    };
    $scope.delNetwork = function (name) {
        for (var key in $scope.service.Spec.Networks) {
            if ($scope.service.Spec.Networks[key].Target === name) {
                $scope.service.Spec.Networks.splice(key, 1);
            }
        }
    };
    $scope.addConstraint = function () {
        $scope.service.Spec.TaskTemplate.Placement.Constraints.push("");
    };
    $scope.delConstraint = function (key) {
        $scope.service.Spec.TaskTemplate.Placement.Constraints.splice(key, 1);
    };
});
