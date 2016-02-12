var url = "http://localhost/imis26/api/item/?ItemClassID=startsWith:Sales";
var token = "rSZVcjVZU2h6NHoS6Z8mEVjUZciVyuZrU9BQQSbgSJw4n31B9YrXIkpO4XQxV3Y60yEELPSrkvPcQw9mKGaOUmegG9LTGb4Vwu_Gl9A5B1I1";


var app = angular.module('app',[]);
var config = {
    headers:{
        RequestVerificationToken: token
    }
};

app.directive("itemdisplay", function(){
   return{
       restrict: 'E',
       templateUrl: 'itemdisplay.html'
   }; 
});


var controller = function($scope, $http){
    
    $scope.title = "Sales Products";
    
    $http.get(url, config).then(function(response){
        $scope.itemListing = response.data; 
    }, function(err){
        $scope.errMessage = "Error occurred";
    }).then(function(){
        $scope.complete = "Run Complete";
    });
};

app.controller("ItemController", ["$scope", "$http", controller]);