var url = "http://localhost/imis26/api/party/";
var id = "101";

var token = "kb5VrcB-QirR7U80UEdO-6htf6wqA3RGir5LPq-haj5pCLoevt1Y8PI7Myi8DOMjIXvSzyzTLycwLAY8Pi0nkVkkQDlMm-Hm6eQHwMHswfg1";


var app = angular.module("app", []);

var config = {
    headers:{
        "RequestVerificationToken" : token
    }
};

app.directive("partyDisplay", function(){
   
   return {
       restrict: "E",
       templateUrl: "partyDisplay.html"
   } 
});

app.factory("partyService", ["$http", function($http){
    
    return $http.get(url + id, config).success(function(data){
        return data;
    }).error(function(err){
        return err;
    });
}]);

var controller = function($scope, partyService){
  
  $scope.title = "Person Information";
  partyService.success(function(data){
      $scope.person = data;

  });
  
  partyService.error(function(err){
      $scope.errMsg = err;
  });
  
    
};


app.controller("PersonController", ["$scope", "partyService", controller]);