var baseUrl = "http://localhost/imis26/api";
var token = "SffC8VeVTwa9U86noWrEOqJ1U1Z-t_gJTiLjjfBcU6xXelEoI_ZfMSViDr4MGRIVLbQrRuXL_3z4J3LeFjvtFD21O9r0bL_OfiGUEUL8vSg1";

var app = angular.module('app', []);

var config = {
    headers: {
        RequestVerificationToken: token
    }
};

app.directive('activityListing', function () {
    return {
        restrict: 'E',
        templateUrl: 'activity-listing.html'
    };
});

var controller = function ($scope, $http) {

    $scope.title = "Activity Manager";
    
    // models
    $scope.ActivityType = "";
    $scope.ActivityDescription = "";
    $scope.ActivityThru = "";

    $scope.CurrentID = "";
    $scope.errorMessage = "";
    $scope.addActivityResponse = "";

    $scope.search = function () {
        $http.get(baseUrl + '/party/' + $scope.CurrentID, config).success(function (data) {
            $scope.person = data;
            $scope.loadActivities();

        }).error(function (err) {
            $scope.errorMessage = "An error occurred: " + JSON.stringify(err.message);
        });
    };



    $scope.loadActivities = function () {
        $http.get(baseUrl + '/Activity/?PartyId=' + $scope.CurrentID, config).success(function (data) {
            $scope.Activities = data;


            $scope.ActivityType = "";
            $scope.ActivityDescription = "";
            $scope.ActivityThru = "";

        }).error(function (err) {
            alert('error loading activities...');
        })
    };

    $scope.addActivity = function () {
        var activity = {
                  
            $type: "Asi.Soa.Core.DataContracts.GenericEntityData, Asi.Soa.Core.Contracts",
            EntityTypeName: "Activity",
            PrimaryParentEntityTypeName: "Party",
            PrimaryParentIdentity: {
                $type: "Asi.Soa.Core.DataContracts.IdentityData, Asi.Soa.Core.Contracts",
                EntityTypeName: "Party",
                IdentityElements: [$scope.CurrentID]
            },
            Properties: [
                {           
                    $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Soa.Core.Contracts",
                    Name: "Activity_Type",
                    Value: $scope.ActivityType
                },
                {
                    $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Soa.Core.Contracts",
                    Name: "Description",
                    Value: $scope.ActivityDescription
                },
                {
                    $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Soa.Core.Contracts",
                    Name: "THRU_DATE",
                    Value: $scope.ActivityThru
                }
            ]
        };

        $http.post(baseUrl + '/Activity', activity, config).success(function (data) {
            $scope.addActivityResponse = "Successfully added new activity.";
            $scope.loadActivities();

        }).error(function (err) {
            $scope.addActivityResponse = "There was an error adding the activity.";

        });
    };
};

app.controller('ActivityController', ["$scope", "$http", controller]);