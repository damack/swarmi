app.controller('AppCtrl', function ($scope, $location) {
    "use strict";
    $scope.isActive = function (viewLocation) {
        if ($location.path().search(viewLocation) !== -1) {
            return true;
        } else {
            return false;
        }
    };
});
