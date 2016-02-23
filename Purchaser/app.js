var baseUrl = "http://localhost/imis26/api";
var token = "YV6WBVoPGcLQZUnE4L1wT8VwK_Vj-p51idXDT18Kq1SG85mEXpCf4-AA3mPa0fsKGQpbcehAUmmFBt8hb1CiS1ezTw8AqgBWZCaQkwEvgOw1";

var app = angular.module('app', []);

var config = {
  headers:{
      RequestVerificationToken: token
  }  
};

app.directive('itemDisplay', function(){
   return{
       restrict: 'E',
       templateUrl: 'item-display.html'
   };
});

app.directive('personDisplay', function(){
    return{
        restrict: 'E',
        templateUrl: 'person-display.html'
    };
});

app.directive('cartDisplay', function(){
    return{
        restrict: 'E',
        templateUrl: 'cart-display.html'
    };
});
var controller = function($scope, $http){
    
    $scope.title = "Cart Purchaser";
    $scope.purchaser = {}; 
    $scope.salesItems=[];
    $scope.cartItems = [];
    $scope.purchaserId = "";
    $scope.errorMessage = "";
    $scope.totalCost = 0;
    
    //handle getting an individual    
    $scope.getPerson = function(){
        if($scope.purchaserId != ""){

            $http.get(baseUrl + '/party/' + $scope.purchaserId, config).success(function(person){
               $scope.purchaser = person; 
            }).error(function(err){
                $scope.errorMessage += "Error with getting person: " + JSON.stringify(err);
            });
        }
    };
    
    $scope.addItem = function(code, title, cost){
        var item = {
            ItemId: code,
            Name: title,
            Price: cost
        };
        
        $scope.totalCost += cost;
        
        $scope.cartItems.push(item);
    }
    
    $http.get(baseUrl + '/item/?ItemClassID=startsWith:Sales', config).success(function(data){
        $scope.salesItems = data;
    }).error(function(err){
        $scope.errorMessage += "Error with loading items: " + JSON.stringify(err);
    });
    
    
};

app.controller('CartController', ["$scope", "$http", controller]);

