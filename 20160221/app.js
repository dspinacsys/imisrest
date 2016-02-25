var app = angular.module('app', []);

var url = "http://localhost/imis26/api/IQA?QueryName=";
var token = "SffC8VeVTwa9U86noWrEOqJ1U1Z-t_gJTiLjjfBcU6xXelEoI_ZfMSViDr4MGRIVLbQrRuXL_3z4J3LeFjvtFD21O9r0bL_OfiGUEUL8vSg1";
var queryPath = "$/Test/TheYoungOnes";


var config = {
  headers:{
      RequestVerificationToken: token
  }  
};

app.factory('IQAFactory', ["$http", function($http){
    
    return $http.get(url + queryPath, config).success(function(data){
        return data;
    }).error(function(err){
        return err;    
    });
}]);

app.directive('iqaResult', function(){
    return{
        restrict: 'E',
        templateUrl: 'iqaresult.html'
    };
});

var controller = function($scope, IQAFactory){
    
    $scope.title = "The Young Ones";
    
    IQAFactory.success(function(data){
        $scope.IQAResults = data;
    });
    IQAFactory.error(function(err){
        $scope.title = JSON.stringify(err);
    });
};

app.controller('IQAController', ["$scope", "IQAFactory", controller]);
