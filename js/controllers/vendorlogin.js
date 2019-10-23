angular.module('newapp')
	.controller('vendorlogCtrl', ['$scope', '$http', '$location', '$route', 'resturl', function ($scope, $http, $location, $route, resturl) {
		$scope.typeOfSearch = [
			{ name: "Category", value: "Category" },
			{ name: "Brand", value: "Brand" },
			{ name: "Product", value: "Product" }
		];
		$scope.isDisabled = false;
		$scope.vendorlog = function (vlogin) {
			$scope.isDisabled = true;
			$http.post(resturl + "/user/login", vlogin).then(function (resp) {
				if (resp.data.success == true) {
					localStorage.setItem("loggedInUser", vlogin.userName);
					$location.path('/dashboard');
					$scope.title = resp.data.name;
					localStorage.setItem("loggedInUserName", $scope.title);
					$scope.userType = resp.data.type;
					localStorage.setItem("loggedInUserType", $scope.userType);
					localStorage.setItem("loggedInuserId", resp.data.userId);
				}
				else if (resp.data.success == false) {
					$scope.errmsg = true;
					$scope.errmessage = resp.data.errorMessage;
					$scope.vlogin.password = "";
					$scope.isDisabled = false;
					$location.path('/vendorlogin');
				}
			});
		};
		$scope.alerthide = function () {
			$scope.errmsg = false;
		};
		$http.get(resturl + "/getAllCategories").then(function (resp) {
			$scope.menuitem = resp.data.categoryData;
		});
		$scope.mouseOver = function (param) {
			$scope.set_bg = function () {
				$scope.bgimg = param.imageURL;
				return {
					"background-image": "url(/clients/onesevenhome/img/" + $scope.bgimg + ".jpg)"
				};
			};
		};
		$http.get(resturl + "/cart/displayCart?userId=" + localStorage.loggedInuserId).then(function (resp) {
			$scope.cartlist = resp.data;
			$scope.cartCode = resp.data.code;
			$scope.totalprice = resp.data.total;
			if (resp.data.shoppingCartItems == null) {
				$scope.lengthofcart = 0;
			} else {
				$scope.lengthofcart = resp.data.shoppingCartItems.length;
			}
		});
	}]);