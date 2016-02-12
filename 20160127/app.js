var eventsUrl = "http://localhost/Asi.Scheduler_imis201/api/event";

var app = angular.module('app', []);


app.directive('eventInfo', function(){
   return{
     restrict: 'E',
     templateUrl: 'eventInfo.html'  
   }; 
});

app.factory('eventsService', ["$http", function($http){
    return $http.get(eventsUrl).success(function(data){
        return data;
    }).error(function(err){
       return err; 
    });
}]);


var controller = function($scope, eventsService){
    
    eventsService.success(function(data){
        $scope.meetingItems = data;
    });
    
    $scope.title = "iMIS Events Data";
    
    $scope.showCode = function(code){
        alert('The code is: ' + code);
    };
    
};

app.controller('EventsController', ["$scope", "eventsService", controller]);
