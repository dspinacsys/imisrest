var personApp = angular.module('personApp', []);
var url = "http://localhost/imis26/api/party?lastname=startsWith:sp";
var postUrl = "http://localhost/imis26/api/party/";

var token = 'kb5VrcB-QirR7U80UEdO-6htf6wqA3RGir5LPq-haj5pCLoevt1Y8PI7Myi8DOMjIXvSzyzTLycwLAY8Pi0nkVkkQDlMm-Hm6eQHwMHswfg1';

var config = {
    headers: {
        "RequestVerificationToken" : token
    }
};


personApp.directive("personInfo", function(){
   
   return {
     restrict: 'E',
     templateUrl: 'personInfo.html'  
   }; 
});


personApp.factory("PeopleService", ["$http", function($http){
    
    return $http.get(url, config).success(function(data){
        return data;
    }).error(function(err){
        return err;
    });
}
    
]);


var controller = function($scope, $http, PeopleService){
    
    $scope.title = "People with Last Names Starting with 'SP'";
    
    PeopleService.success(function(data){
       $scope.people = data;  
    });
    
    $scope.firstName = "";
    $scope.lastName = "";
    $scope.newPersonMessage = "";
    $scope.addPerson = function()
    {
        var person = {
          $type: "Asi.Soa.Membership.DataContracts.PersonData, Asi.Soa.Membership.Contracts",
          PersonName:{
            $type: "Asi.Soa.Membership.DataContracts.PersonNameData, Asi.Soa.Membership.Contracts",
            FirstName: $scope.firstName,
            LastName: $scope.lastName  
          }, 
        };
        
        $http.post(postUrl, person, config).success(function(data){
           $scope.newPersonMessage = "Successfully added: " + data.PartyId;

        }).error(function(err){
           alert('Error: ' + JSON.stringify(err));
        });
        

        
        $scope.firstName = "";
        $scope.lastName = "";
    }; 
};

personApp.controller("PartyController", ["$scope", "$http", "PeopleService", controller]);