angular.module('newapp')
	.controller('cartCtrl', ['$scope', '$http', '$location', 'resturl', function ($scope, $http, $location, resturl) {
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

		if ($scope.userlogged == false) {
			localStorage.clear();
			$location.path('/login');
		}
		else {
			$http.get(resturl + "/cart/displayCart?userId=" + localStorage.loggedInuserId).then(function (resp) {
				$scope.cartlist = resp.data;
				$scope.cartCode = resp.data.code;
				$scope.totalprice = resp.data.total;
				if (resp.data.shoppingCartItems == null) {
					$scope.lengthofcart = 0;
				} else {
					$scope.lengthofcart = resp.data.shoppingCartItems.length;
				}
				if ($scope.lengthofcart == 0) {
					$scope.cartEmpty = false;
					$scope.cartNullMessage = true;
				}
				else {
					$scope.cartEmpty = true;
				}

				for (i = 0; i < $scope.lengthofcart; i++) {
					$scope.prodId = resp.data.shoppingCartItems[i].id;
				}
				for (i = 0; i < resp.data.shoppingCartItems.length; i++) {
					$scope.cartdiscountPrice = resp.data.shoppingCartItems[i].discountPrice;
					$scope.cartPrice = resp.data.shoppingCartItems[i].price;
				}

				$scope.showPrice = true;
				if ($scope.cartdiscountPrice == null || $scope.cartPrice == $scope.cartdiscountPrice) {
					$scope.showPrice = false;
				}
			});
			$scope.deleteProd = function (idProd) {
				$http.get(resturl + "/cart/removeShoppingCartItem/" + $scope.cartCode + "/" + idProd).then(function (resp) {
					$http.get(resturl + "/cart/displayCart?userId=" + localStorage.loggedInuserId).then(function (resp) {
						$scope.cartlist = resp.data;
						$scope.totalprice = resp.data.total;
						if (resp.data.shoppingCartItems == null) {
							$scope.lengthofcart = 0;
						} else {
							$scope.lengthofcart = resp.data.shoppingCartItems.length;
						}
						if ($scope.lengthofcart == 0) {
							$scope.cartEmpty = false;
							$scope.cartNullMessage = true;
						}
						else {
							$scope.cartEmpty = true;
						}
					});
				});
			};
		}
		if (localStorage.loggedInuserId == "undefined") {
			$scope.lengthofcart = 0;
		}
		$scope.update = function () {
			var allUpdateCartsArr = [];
			for (i = 0; i < $scope.lengthofcart; i++) {
				$scope.prodId = $scope.cartlist.shoppingCartItems[i].id;
				$scope.qty = $scope.cartlist.shoppingCartItems[i].quantity;
				$scope.category = $scope.cartlist.shoppingCartItems[i].category;
				if ($scope.category == "Wallpaper") {
					$scope.eachCartProduct = {
						"id": $scope.cartlist.shoppingCartItems[i].id,
						"code": $scope.cartlist.code,
						"category": "Wallpaper",
						"quantity": $scope.cartlist.shoppingCartItems[i].quantity
					};
				}
				else {
					$scope.eachCartProduct = {
						"id": $scope.cartlist.shoppingCartItems[i].id,
						"code": $scope.cartlist.code,
						"quantity": $scope.cartlist.shoppingCartItems[i].quantity
					};
				}
				allUpdateCartsArr.push($scope.eachCartProduct);
			}
			$scope.updateCartsReq = allUpdateCartsArr;
			$http.post(resturl + "/cart/updateShoppingCartItem?userId=" + localStorage.loggedInuserId, $scope.updateCartsReq).then(function (resp) {
				$scope.cartlist = resp.data;
				$http.get(resturl + "/cart/displayCart?userId=" + localStorage.loggedInuserId).then(function (resp) {
					$scope.cartlist = resp.data;
					$scope.totalprice = resp.data.total;
					$scope.lengthofcart = resp.data.shoppingCartItems.length;
				});
			});
		};
		$scope.increment = function (subcart) {
			subcart.quantity++;
		};
		$scope.decrement = function (subcart) {
			subcart.quantity--;
		};

		// Page Navigation To Top Functionality //
		jQuery(window).scroll(function () {
			if (jQuery(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
				jQuery('#return-to-top').fadeIn(200);    // Fade in the arrow
			} else {
				jQuery('#return-to-top').fadeOut(200);   // Else fade out the arrow
			}
		});
		jQuery('#return-to-top').click(function () {      // When arrow is clicked
			jQuery('body,html').animate({
				scrollTop: 0                       // Scroll to top of body
			}, 500);
		});
	}]);