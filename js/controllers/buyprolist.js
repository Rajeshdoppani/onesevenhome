angular.module('newapp')
	.controller('buyprolistCtrl', ['$scope', '$http', '$routeParams', '$location', '$window', 'resturl', '$rootScope', function ($scope, $http, $routeParams, $location, $window, resturl, $rootScope) {
		if ($rootScope.usertype == undefined) {
			$scope.custmor = true;
			$scope.vendor = false;
		} else {
			$scope.custmor = false;
			$scope.vendor = true;
		}

		$scope.id = $routeParams.id;

		if ($routeParams.id == "Real Estate") {
			$http.get("js/controllers/realestate.json").then(function (resp) {
				$scope.furnitureproduct = resp.data;
			});

		}
		if ($routeParams.id == "Furniture & Decor") {
			$http.get("js/controllers/FURNITURE.JSON").then(function (resp) {
				$scope.furnitureproduct = resp.data;
			});
		}

		if ($routeParams.id == "Electronics") {
			$http.get("js/controllers/Electronics.json").then(function (resp) {
				$scope.furnitureproduct = resp.data;
			});
		}

		if ($routeParams.id == "Kitchen Appliances") {
			$http.get("js/controllers/KitchenAppliances.json").then(function (resp) {
				$scope.furnitureproduct = resp.data;
			});
		}
		if ($routeParams.id == "Home Amenities") {
			$http.get("js/controllers/Home Amenities.json").then(function (resp) {
				$scope.furnitureproduct = resp.data;
			});
		}
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

		$http.get(resturl + "/cart/displayCart?userId=" + localStorage.loggedInuserId).then(function (resp) {
			$scope.cartlist = resp.data;
			if (resp.data.shoppingCartItems == null) {
				$scope.lengthofcart = 0;
			} else {
				$scope.lengthofcart = resp.data.shoppingCartItems.length;
			}
		});
	}]);