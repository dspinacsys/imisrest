var partyGetUrl = "http://localhost/imis26/api/party?createdOn=gt:2016-02-01";
var partyPostUrl = "http://localhost/imis26/api/party/";
var token = "KeWoYFjyw8vB7bBwPD-57WtOtOJ1C4ZcCqzkzqFOB-CyC-92yDTR-VHw11j8b3KQ22HmtGKT1P_xiFdOjkP0Vmv99FL9VCvJuBbkOSZobkU1";

var config = {

    headers: {
        "RequestVerificationToken": token
    }
};

var personApp = angular.module("personApp", []);

personApp.directive('personInfo', function () {
    return {

        restrict: 'E',
        templateUrl: 'personInfo.html'
    };
});

personApp.factory('PersonService', ["$http", function ($http) {

    return $http.get(partyGetUrl, config).success(function (data) {
        return data;
    }).error(function (err) {
        return err;
    });

}]);


var controller = function ($scope, $http, PersonService) {

    $scope.mainTitle = "Person Creator";
    $scope.listingHeading = "Individuals Created Today";

    PersonService.success(function (data) {
        $scope.personListing = data;
    });

    $scope.firstName = "";
    $scope.lastName = "";

    $scope.successMessage = "";
    $scope.errorMessage = "";

    $scope.addPerson = function () {

        $scope.successMessage = "";
        $scope.errorMessage = "";

        var person = {
                $type: "Asi.Soa.Membership.DataContracts.PersonData, Asi.Soa.Membership.Contracts",
                PersonName: {
                    $type: "Asi.Soa.Membership.DataContracts.PersonNameData, Asi.Soa.Membership.Contracts",
                    FirstName: $scope.firstName,
                    LastName: $scope.lastName,
                    InformalName: "Super-" + $scope.firstName
                }
            };
        
        $http.post(partyPostUrl, person, config).success(function(data){
            $scope.successMessage = "Successfully added a new individual.";
            $scope.firstName = "";
            $scope.lastName = "";
        }).error(function(err){
            $scope.successMessage = "There was an error in processing the request.";  
        });

      
            refreshData($scope, PersonService);
    }


};

function refreshData($scope, PersonService) {
    PersonService.success(function (data) {
        $scope.personListing = data;
    });
}



personApp.controller('PersonController', ["$scope", "$http", "PersonService", controller]);