angular.module('newapp')
	.controller('paymentctrl', ['$scope', '$http', '$location', 'resturl', function ($scope, $http, $location, resturl) {
		$scope.typeOfSearch = [
			{ name: "Category", value: "Category" },
			{ name: "Brand", value: "Brand" },
			{ name: "Product", value: "Product" }
		];
		if (localStorage.loggedInUser != undefined) {
			$scope.loggedInUser = localStorage.loggedInUser;
			$scope.loggedInUserName = localStorage.loggedInUserName;
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

		$http.get("js/controllers/payment.json").then(function (resp) {
			$scope.paymentlist = resp.data.payment;
		});

		$http.get(resturl + "/cart/displayCart?userId=" + localStorage.loggedInuserId).then(function (resp) {
			$scope.cartlist = resp.data;
			$scope.lengthofcart = resp.data.shoppingCartItems.length;
			$scope.totalprice = resp.data.total;
		});
		$scope.lengthofcart = 0;
	}]);