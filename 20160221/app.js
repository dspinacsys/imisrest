var app = angular.module('app', []);

var url = "http://localhost/imis26/api/IQA?QueryName=";
var token = "esaYlDoL50obBYz6aodQ_8cW9MxAXgxiSkWGPfVtpo7ZxN2xqmpuZ5f1DuftMU6gswxeLHRE81pHpEBPmD5RtRlD_8QSaNrZcxFW0HuD2ec1";
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
