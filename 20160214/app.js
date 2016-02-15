// global variables
var baseUrl = "http://localhost/imis26/api/party/";
var token = "KJG_9EOdv7gkh5AP-tsBHqo6qXyLVd16l1Quc737blr2m4LngV8YhfJUdNmWu3RsZv01CLfTeI9KAHxbbdo1s6zDmJhmccjVTCZyt-th6ZI1";

// header configuration
var config = {
    headers: {
        RequestVerificationToken: token
    }
};

// app initialization
var app = angular.module('app', []);

// controller definition
var controller = function ($scope, $http) {
    
    // content titles
    $scope.title = "Edit an Individual";
    $scope.subTitle = "Individuals with Last Names Beginning with 'SP'";
    $scope.people = {};
    // init function
    $scope.init = function () {

        $scope.currentID = "";
        $scope.currentFirstName = "";
        $scope.currentLastName = "";

        var getUrl = baseUrl + '?lastname=startsWith:SP';
        $http.get(getUrl, config).success(function (data) {
            $scope.people = data;
            $scope.completedMessage = "Initial request complete";
        }).error(function (err) {

            $scope.completedMessage = "An error has occurred: " + JSON.stringify(err);
        });

    };

    // load a new individual into the model
    $scope.loadCurrent = function (id, firstName, lastName) {
        $scope.currentID = id;
        $scope.currentFirstName = firstName;
        $scope.currentLastName = lastName;
    };

    // update a record
    $scope.updatePerson = function () {



        if ($scope.currentID != "") {
            var updatedPerson = {
                $type: "Asi.Soa.Membership.DataContracts.PersonData, Asi.Soa.Membership.Contracts",
                PartyId: $scope.currentID,
                PersonName: {
                    $type: "Asi.Soa.Membership.DataContracts.PersonNameData, Asi.Soa.Membership.Contracts",
                    FirstName: $scope.currentFirstName,
                    LastName: $scope.currentLastName
                }
            };

            $http.put(baseUrl + $scope.currentID, updatedPerson, config).success(function (data) {
                $scope.init();
                $scope.completedMessage = "Update complete.";
            }).error(function (err) {
                $scope.completedMessage = "An error occurred in updating: " + JSON.stringify(err);
            });


        }
        else
            $scope.completedMessage = "No individual selected.";

    };
};

// set the controller in context
app.controller("PersonController", ["$scope", "$http", controller]);

