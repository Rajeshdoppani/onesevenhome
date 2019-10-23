angular.module('newapp')
	.controller('buysellCtrl', ['$scope', '$http', '$routeParams', '$location', '$window', 'resturl', '$rootScope', function ($scope, $http, $routeParams, $location, $window, resturl, $rootScope) {
		// if ($rootScope.usertype == undefined){
		// $scope.custmor = true;
		// $scope.vendor = false;
		// console.log($rootScope.firstName);
		// console.log($rootScope.lastName);
		// }else{
		// $scope.custmor = false;
		// $scope.vendor = true;
		// console.log($rootScope.vendorName);
		// console.log($rootScope.usertype);
		// }


		$scope.typeOfSearch = [
			{ name: "Category", value: "Category" },
			{ name: "Brand", value: "Brand" },
			{ name: "Product", value: "Product" }
		];
		$window.scrollTo(0, 0);
		if (localStorage.loggedInUser != undefined) {
			$scope.loggedInUser = localStorage.loggedInUser;
			$scope.loggedInUserName = localStorage.loggedInUserName;
			$scope.userlogged = true;
		} else {
			$scope.userlogged = false;
		}
		if ($scope.userlogged == true) {
			$scope.logout = function () {
				localStorage.clear();
				$location.path('/login');
			};
		}
			$scope.myProfile = function () {
				$location.path('/myaccount');
			};
			$http.get("js/controllers/buysellcat.json").then(function (resp) {
				$scope.buysellcat = resp.data;
			});

			$http.get(resturl + "/cart/displayCart?userId=" + localStorage.loggedInuserId).then(function (resp) {
				$scope.cartlist = resp.data;
				if (resp.data.shoppingCartItems == null) {
					$scope.lengthofcart = 0;
				} else {
					$scope.lengthofcart = resp.data.shoppingCartItems.length;
				}
			});
		}]);