angular.module('newapp')
	.controller('deliveryctrl', ['$scope', '$http', '$location', 'resturl', '$rootScope', '$sce', function ($scope, $http, $location, resturl, $rootScope, $sce) {
		$scope.typeOfSearch = [
			{ name: "Category", value: "Category" },
			{ name: "Brand", value: "Brand" },
			{ name: "Product", value: "Product" }
		];
		if (localStorage.loggedInUser != undefined) {
			$scope.loggedInUser = localStorage.loggedInUser;
			$scope.loggedInUserName = localStorage.loggedInUserName;
			$scope.loggedInuserId = localStorage.loggedInuserId;
			$scope.userlogged = true;
			$http.get(resturl + "/cart/displayCart?userId=" + $scope.loggedInuserId).then(function (resp) {
				$scope.cartlist = resp.data;
				$scope.cartCode = resp.data.code;
				$scope.totalprice = resp.data.total;
				if (resp.data.shoppingCartItems == null) {
					$scope.lengthofcart = 0;
				} else {
					$scope.lengthofcart = resp.data.shoppingCartItems.length;
				}
			});
		} else {
			$scope.userlogged = false;
			$scope.lengthofcart = 0;
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

		$http.get(resturl + "/shop/customer/displayShippingAddress/" + localStorage.loggedInuserId).then(function (resp) {
			$scope.deliverylist = resp.data.shippingAddress;
			$scope.customerName = resp.data.customerName;
			$scope.shippingLength = resp.data.shippingAddress.length;
			$scope.hideAddress = true;
			if ($scope.shippingLength >= 3) {
				$scope.hideAddress = false;
			}
		});
		$scope.newaddress = function (user) {
			var tempObj = $scope.deliverylist.slice(-1)[0];
			$scope.addressId = tempObj.preferenceOrder;
			if ($scope.addressId == 1 || $scope.addressId == 3) {
				user.billingAddress = false;
				user.deliveryAddress = true;
				user.secondaryDeliveryAddress = false;
			}
			else {
				user.billingAddress = false;
				user.deliveryAddress = false;
				user.secondaryDeliveryAddress = true;
			}
			$http.post(resturl + "/shop/customer/updateShippingAddress/" + localStorage.loggedInuserId, user).then(function (resp) {
				$scope.deliverylist = resp.data.shippingAddress;
				$http.get(resturl + "/shop/customer/displayShippingAddress/" + localStorage.loggedInuserId).then(function (resp) {
					$scope.deliverylist = resp.data.shippingAddress;
					$scope.shippingLength = resp.data.shippingAddress.length;
					if ($scope.shippingLength >= 3) {
						$scope.hideAddress = false;
					}
					else {
						$scope.hideAddress = true;
					}
				});
			});
		};
		$scope.deleteAddress = function (idProd) {
			$http.get(resturl + "/shop/customer/removeShippingAddress/" + localStorage.loggedInuserId + "?addressPref=" + idProd).then(function (resp) {
				$http.get(resturl + "/shop/customer/displayShippingAddress/" + localStorage.loggedInuserId).then(function (resp) {
					$scope.deliverylist = resp.data.shippingAddress;
					$scope.shippingLength = resp.data.shippingAddress.length;
					if ($scope.shippingLength >= 3) {
						$scope.hideAddress = false;
					}
					else {
						$scope.hideAddress = true;
					}
				});
			});
		};
		$scope.preferenceOrder = 1;
		$scope.address = function (preferenceOrder) {
			$scope.preferenceOrder = preferenceOrder;
		};
		$scope.placeorder = function (paymentType) {
			var request = {
				preferedShippingAddress: $scope.preferenceOrder,
				cartCode: $scope.cartCode,
				userId: $scope.loggedInuserId
			};
			if (paymentType == 'COD') {
				$http.post(resturl + '/order/completeCOD_Order?userId=' + $scope.loggedInuserId, request).then(function (resp) {
					if (resp.data.id) {
						$location.path('/orders/confirmation/' + resp.data.id);
					}
					else {
						$scope.errorMessage = 'Cannot place the order at this moment. Try again...!!!';
						$('#errorMessageModal').modal('show');						
					}
				});
			}
			else {
				$http.post(resturl + "/order/commitCCAvenueOrder?userId=" + $scope.loggedInuserId, request).then(function (resp) {
					var data = {
						url: $sce.trustAsResourceUrl(resp.data.paymentGatewayUrl),
						method: 'POST',
						params: {
							'encRequest': resp.data.encRequest,
							'access_code': resp.data.accessCode
						}
					};
					$rootScope.$broadcast('goToPaymentGateway', data);
				});
			}
			// window.location.assign(resturl + "/order/commitOrder/" + $scope.cartCode + "/" + $scope.preferenceOrder + "?" + "userId=" + localStorage.loggedInuserId);
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
	}])
	.directive('autoSubmitForm', ['$timeout', function($timeout) {
		return {
			replace: true,
			scope: {},
			template: '<form action="{{ formData.url }}" method="{{ formData.method }}">' +
					  ' <div ng-repeat="(key,val) in formData.params">' +
					  '     <input type="hidden" name="{{ key }}" id="{{ key }}" value="{{ val }}" />' +
					  ' </div>' +
					  '</form>',
			link: function($scope, element, $attrs) {
				$scope.$on('goToPaymentGateway', function(event, data) {
					$scope.formData = data;
					$timeout(function() {
						$(element).submit();
					});
				 });
			}
		};
	}]);