var baseUrl = "http://localhost/imis26/api/event";
var token = "kb5VrcB-QirR7U80UEdO-6htf6wqA3RGir5LPq-haj5pCLoevt1Y8PI7Myi8DOMjIXvSzyzTLycwLAY8Pi0nkVkkQDlMm-Hm6eQHwMHswfg1";


var eventApp = angular.module("eventApp", []);

var config = {
  headers: {
      "RequestVerificationToken": token
  }    
};


eventApp.directive("eventDisplay", function(){
   return {
      restrict: 'E',
      templateUrl: 'eventDisplay.html'
   };
    
});

eventApp.factory("EventService", ["$http", function($http){
    
    return $http.get(baseUrl + "?name=startsWith:AN", config).success(function(data){
        return data;
    }).error(function(err){
        return err;
    });
    
}]);


var controller = function($scope, $http, EventService){
    
    $scope.title = "Event Listing";
    
    EventService.success(function (data){
       $scope.eventListing = data; 
    });
    
    $scope.eventCode = "";
    $scope.eventName = "";
    
    $scope.addItem = function(){
       var eventItem = {
           "$type": "Asi.Soa.Events.DataContracts.EventData, Asi.Soa.Events.Contracts",
           "EventCode": $scope.eventCode,
           "Name": $scope.eventName
       };
       
       $http.post(baseUrl, eventItem, config).success(function(data){
         

       }).error(function(err){
           alert('Error Occurred: ' + JSON.stringify(err));
       });
       
        $http.get(baseUrl + "?name=startsWith:AN", config).success(function(data){
               $scope.eventListing = data;
           });
           
       $scope.eventCode = "";
       $scope.eventName = "";
    };
    
};

eventApp.controller("EventsController", ["$scope", "$http", "EventService", controller]);


