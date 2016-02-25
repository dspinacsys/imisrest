var baseUrl = "http://localhost/imis26/api";
var token = "SffC8VeVTwa9U86noWrEOqJ1U1Z-t_gJTiLjjfBcU6xXelEoI_ZfMSViDr4MGRIVLbQrRuXL_3z4J3LeFjvtFD21O9r0bL_OfiGUEUL8vSg1";

var app = angular.module('app', []);

var config = {
    headers: {
        RequestVerificationToken: token
    }
};

app.directive('itemDisplay', function () {
    return {
        restrict: 'E',
        templateUrl: 'item-display.html'
    };
});

app.directive('personDisplay', function () {
    return {
        restrict: 'E',
        templateUrl: 'person-display.html'
    };
});

app.directive('cartDisplay', function () {
    return {
        restrict: 'E',
        templateUrl: 'cart-display.html'
    };
});

app.directive('paymentDisplay', function () {
    return {
        restrict: 'E',
        templateUrl: 'payment-display.html'
    };
});


var controller = function ($scope, $http) {

    $scope.title = "Cart Purchaser";
    $scope.purchaser = {};
    $scope.salesItems = [];
    $scope.cartItems = [];
    $scope.purchaserId = "";
    $scope.errorMessage = "";
    $scope.totalCost = 0;
    $scope.paymentResponse = "";

    $scope.ccNum = "";
    $scope.ccExp = "";
    $scope.ccName = "";
    
    //handle getting an individual    
    $scope.getPerson = function () {
        if ($scope.purchaserId != "") {

            $http.get(baseUrl + '/party/' + $scope.purchaserId, config).success(function (person) {
                $scope.purchaser = person;
                $scope.purchaserId = person.PartyId;
            }).error(function (err) {
                $scope.errorMessage += "Error with getting person: " + JSON.stringify(err);
            });
        }
    };

    $scope.addItem = function (code, title, cost) {
        var item = {
            ItemId: code,
            Name: title,
            Price: cost
        };

        $scope.totalCost += cost;

        $scope.cartItems.push(item);
    }

    $http.get(baseUrl + '/item/?ItemClassID=startsWith:Sales', config).success(function (data) {
        $scope.salesItems = data;
    }).error(function (err) {
        $scope.errorMessage += "Error with loading items: " + JSON.stringify(err);
    });

    $scope.processPayment = function () {


        if ($scope.cartItems.length == 0) {
            alert('You must have at least one item in the cart.');
            return;
        }
        if ($scope.purchaserId == "") {
            alert('There is no customer defined.');
            return;
        }

        $scope.paymentResponse = JSON.stringify($scope.purchaser);


        var lineInfo = [];
        for (var l = 0; l < $scope.cartItems.length; l++) {
            var item = $scope.cartItems[l];

            var lineItem = {
                ExtendedAmount: item.Price,
                Item: {
                    ItemCode: item.ItemId,
                    ItemId: item.ItemId,
                    Name: item.Name
                },
                LineNumber: l + 1,
                QuantityOrdered: {
                    $type: "System.Nullable`1[[Asi.Soa.Commerce.DataContracts.QuantityData, Asi.Soa.Commerce.Contracts]], mscorlib",
                    Amount: 1
                },
                UnitPrice: item.Price,
                BaseUnitPrice: item.Price
            };
            lineInfo.push(lineItem);
        }

        var currencyInfo = {
            $type: "Asi.Soa.Core.DataContracts.CurrencyData, Asi.Soa.Core.Contracts",
            CurrencyCode: "USD",
            DecimalPositions: 2
        };
        var customerParty = {
            $type: "Asi.Soa.Commerce.CustomerPartyData, Asi.Soa.Commerce.Contracts",
            PartyId: $scope.purchaserId
        };

        var cart = {
            $type: "Asi.Soa.Commerce.DataContracts.CartData, Asi.Soa.Commerce.Contracts",
            UseId: $scope.purchaserId,
            ComboOrder: {
                $type: "Asi.Soa.Commerce.DataContracts.ComboOrderData, Asi.Soa.Commerce.Contracts",
                Currency: currencyInfo,
                Order: {
                    $type: "Asi.Soa.Commerce.DataContracts.OrderData, Asi.Soa.Commerce.Contracts",
                    BillToCustomerParty: customerParty,
                    Currency: currencyInfo,
                    Delivery: {
                        $type: "Asi.Soa.Commerce.DataContracts.DeliveryData, Asi.Soa.Commerce.Contracts",
                        Address: $scope.purchaser.Addresses[0].Address
                    },
                    Lines: lineInfo,
                    SoldToCustomerParty: customerParty,

                }
            },
            Payments: {
                $type: "Asi.Soa.Commerce.DataContracts.RemittanceData, Asi.Soa.Commerce.Contracts",
                CreditCardInformation: {
                    $type: "Asi.Soa.Commerce.DataContracts.CreditCardInformationData, Asi.Soa.Commerce.Contracts",
                    Address: $scope.purchaser.Addresses[0].Address,
                    CardNumber: $scope.ccNum,
                    Expiration: $scope.ccExp,
                    HoldersName: $scope.ccName,
                    CardType: "VISA"
                },
                PayorParty: customerParty
            }

        };
        
        // process the cart
        $scope.paymentResponse = 'About to process cart...';
        $http.post(baseUrl + '/cart', cart, config).success(function (data) {
            $scope.paymentResponse = 'Success: ' + JSON.stringify(data);
        }).error(function (err) {
            $scope.paymentResponse = 'An error has occurred: ' + JSON.stringify(err);
        })

    };

};

app.controller('CartController', ["$scope", "$http", controller]);

