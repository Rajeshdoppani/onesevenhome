angular.module('newapp')
	.controller('RegistrationCtrl', ['$scope', '$http', '$location', '$route', 'resturl', '$rootScope', function ($scope, $http, $location, $route, resturl, $rootScope) {
		$scope.typeOfSearch = [
			{ name: "Category", value: "Category" },
			{ name: "Brand", value: "Brand" },
			{ name: "Product", value: "Product" }
		];
		$http.get(resturl + "/getAllCategories").then(function (resp) {
			$scope.menuitem = resp.data.categoryData;
		});
		localStorage.clear();
		$scope.isDisabled = false;
		$scope.alerthide = function () {
			$scope.errmsg = false;
		};
		if (localStorage.loggedInUser != undefined) {
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
		}
		else {
			$scope.lengthofcart = 0;
		}

		// Registration & OTP Generation Function //
		$scope.register = function (user) {
			$scope.isDisabled = true;
			$rootScope.firstName = user.firstName;
			$rootScope.lastName = user.lastName;
			$rootScope.usertype = user.userType;
			user.activationURL = "http://onesevenhome.com/#/activateuser";
			$http.post(resturl + "/customer/registerBySmsOtp", user).then(function (resp) {
				if (resp.data.status == "true") {
					localStorage.setItem('session_id', JSON.stringify(resp.data.otpSessionId));
					$("#otpModalPopup").modal({ backdrop: 'static', keyboard: false, show: true });
					/*
					var count = 60, timer = setInterval(function () {
						$("#counter").html(count--);
						if (count == -1) {
							$scope.showResendBtn = true;
							clearInterval(timer);
						}
					}, 1000);
					*/
				}
				else {
					$scope.errmsg = true;
					$scope.isDisabled = false;
					$location.path('/registration');
					$scope.errmessage = resp.data.errorMessage;
				}
			});
		};

		// OTP Verification Function //
		$scope.verifyOTP = function (otpValue) {
			$scope.isDisabled = true;
			$("#otpModalPopup").modal('hide');
			var request = {
				phone: $scope.user.phone,
				smsOtpSessionId: JSON.parse(localStorage.getItem('session_id')),
				smsOtpNumber: otpValue
			};
			$http.post(resturl + '/user/activateBySms', request).then(
				function successCallback(resp) {
					if (resp.data.status == 'TRUE') {
						localStorage.clear();
						$location.path('/confirm');
					}
				},
				function errorCallback(resp) {
					if (resp.status !== 200) {
						$scope.errmessage = 'Invalid OTP. Enter valid OTP.';
						$scope.isError = true;
						$scope.isDisabled = false;
						$("#otpModalPopup").modal({ backdrop: 'static', keyboard: false, show: true });
					}
				}
			);
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