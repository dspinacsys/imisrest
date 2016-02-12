var app = angular.module('app', []);

var templateHtml = "<h5>{{ post.title }}</h5><em>{{ post.body }}</em>";

app.factory('postService', ["$http", function($http){
    
    return $http.get('http://jsonplaceholder.typicode.com/posts').success(function(data){
        return data;
    }).error(function(err){
       return err; 
    });
    
}]);

app.directive('postInfo', function(){
   return {
       restrict: 'E',
       template: templateHtml
   };
});

var controller = function($scope, postService){
    $scope.title = "These Posts!";
    
    postService.success(function(data){
        
        $scope.posts = data;
        
    });
    
    $scope.alerts = function(id){
        alert('This is post ' + id);
    };
    
}

app.controller('PostController', ['$scope', 'postService', controller]);