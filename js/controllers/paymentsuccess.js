angular.module('newapp')
	.controller('paymentsuccessCtrl', ['$scope', '$http', '$location', '$window', 'resturl', function ($scope, $http, $location, $window, resturl) {
		$scope.typeOfSearch = [
			{ name: "Category", value: "Category" },
			{ name: "Brand", value: "Brand" },
			{ name: "Product", value: "Product" }
		];
		$window.scrollTo(0, 0);
		if (localStorage.loggedInUser != undefined) {
			$scope.loggedInUser = localStorage.loggedInUser;
			$scope.userlogged = true;
		} else {
			$scope.userlogged = false;
		}
		$scope.logout = function () {
			localStorage.clear();
			$location.path('/login');
		};
		$scope.myProfile = function () {
			$location.path('/myaccount');
		};
		$http.get(resturl + "/getAllCategories").then(function (resp) {
			$scope.menuitem = resp.data.categoryData;
		});

		$http.get(resturl + "/getContactUS").then(function (resp) {
			$scope.contactdetails = resp.data;
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