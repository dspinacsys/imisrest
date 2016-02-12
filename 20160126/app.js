var app = angular.module('app', []);

app.directive('userInfo', function(){
   return{
     restrict: 'E',
     templateUrl: "userInfo.html"  
   };
});

app.factory('userService', ["$http", function($http){
    
    return $http.get('http://jsonplaceholder.typicode.com/users').success(function(data){
        return data;
    }).error(function(err){
       return err; 
    });
    
}]);

var controller = function($scope, userService){
    
    $scope.title = "These Users";
    $scope.userClick = function(name){
        alert('This is '+ name);
    };
    
    userService.success(function(data){
        $scope.users = data;
    });
    
    
};

app.controller('UsersController', ["$scope", "userService", controller]);