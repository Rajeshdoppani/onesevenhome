angular.module('newapp')
	.controller('ProductpageCtrl', ['$scope', '$http', '$location', '$routeParams', 'resturl', function ($scope, $http, $location, $routeParams, resturl) {
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
		} else {
			$scope.userlogged = false;
		}
		$scope.isDisabled = false;
		$scope.logout = function () {
			localStorage.clear();
			$location.path('/login');
		};
		$scope.myProfile = function () {
			$location.path('/myaccount');
		};

		// Get All Categories //
		$http.get(resturl + "/getAllCategories").then(function (resp) {
			$scope.menuitem = resp.data.categoryData;
		});

		// Get Product Details API Call //
		$http.get(resturl + "/products/" + $routeParams.prodid).then(function (resp) {
			$scope.ppage = resp.data;
			$scope.categoryCode = resp.data.parentCategoryCode;
			$scope.categoryName = resp.data.parentCategoryCode.replace("_", " ");
			$scope.subCategoryName = resp.data.categoryCode.replace("_", " ");
			$scope.relatedProductList = resp.data.relatedProductList;
			$scope.page = resp.data.discountPercentage;
			$scope.pagedescription = resp.data.productDescription;
			$scope.offerPrice = resp.data.productDiscountPrice;
			$scope.mainPrice = resp.data.productOriginalPrice;
			$scope.pointDescription = resp.data.productDescTitle;
			$scope.ratings = [{ number: resp.data.avgReview }];
			$scope.recommend = resp.data.recomendedProductList;
			$scope.RecomendLoaded = true;
			$scope.slickrecommendedprocutsConfig = {
				dots: false,
				arrows: false,
				infinite: true,
				slidesToShow: 4,
				slidesToScroll: 1,
				autoplay: true,
				autoplayspeed: 500,
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							arrows: false,
							centerMode: true,
							centerPadding: '40px',
							slidesToShow: 3,
							slidesToScroll: 1
						}
					},
					{
						breakpoint: 800,
						settings: {
							arrows: false,
							centerMode: true,
							centerPadding: '40px',
							slidesToShow: 2,
							slidesToScroll: 1
						}
					},
					{
						breakpoint: 767,
						settings: {
							arrows: false,
							centerMode: true,
							centerPadding: '40px',
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}]
			};
			$scope.showPrice = true;
			if ($scope.page == 0 || $scope.page == null || $scope.offerPrice == $scope.mainPrice) {
				$scope.showPrice = false;
				$scope.originalPriceValue = true;
			}
			if ($scope.pointDescription != null) {
				$scope.showDescPoints = true;
				$scope.array = [];
				var numbers = $scope.pointDescription;
				var numbers1 = numbers.split('#');
				for (var i = 0; i < numbers1.length; i++) {
					var obj = {};
					var split = numbers1[i].split('*');
					obj['.title'] = split[0];
					obj['.value'] = split[1];
					$scope.array.push(obj);
				}
			}
			else {
				$scope.showDescPoints = false;
			}

			$http.get(resturl + '/categories/services/' + $scope.categoryCode).then(function (resp) {
				$scope.serviceData = resp.data.services[0];
			});
		});

		// Product Average Star Rating //
		$http.get(resturl + "/products/" + $routeParams.prodid + "/reviews?pageNumber=1&pageSize=5").then(function (resp) {
			$scope.prod = resp.data.reviewList;
			$scope.totalCount = resp.data.paginationData.totalCount;
			$scope.averagereview = resp.data.avgReview;
			$scope.userRatings = resp.data.reviewList;
			$scope.totalreview = resp.data.totalratingCount;
			$scope.uptotalCount = resp.data.paginationData.totalCount;
			$scope.ratings = [{ number: $scope.averagereview }];
		});
		$scope.page = 1;
		$scope.PagingAct = function (page, pageSize, total) {
			$http.get(resturl + "/products/" + $routeParams.prodid + "/reviews?pageNumber=" + page + "&pageSize=5").then(function (resp) {
				$scope.prod = resp.data.reviewList;
				$scope.totalCount = resp.data.paginationData.totalCount;
				$scope.averagereview = resp.data.avgReview;
				$scope.userRatings = resp.data.reviewList;
				$scope.totalreview = resp.data.totalratingCount;
				$scope.ratings = [{ number: $scope.averagereview }];
			});
		};

		$scope.getStars = function (rating) {
			// Get the value
			var val = parseFloat(rating);
			// Turn value into number/100
			var size = val / 5 * 100;
			return size + '%';
		};
		if ($scope.userlogged == false) {
			$scope.showReview = false;
		}
		else {
			$scope.showReview = true;
			/* Save Review With Rating Service */
			$scope.onItemRating = function (rating) {
				$scope.starValue = rating;
			};
			$scope.submitReview = function (giveReview) {
				if ($scope.starValue == undefined) {
					$scope.failureMsg = 'Please provide rating.';
					$('#errorModalPopup').modal('show');
					return;
				}
				$('#writeReviewModal').modal('hide');
				var reqObj = {
					"userId": $scope.loggedInuserId,
					"productId": $routeParams.prodid,
					"rating": $scope.starValue,
					"description": giveReview.description,
					"descriptionName": $scope.loggedInUserName
				};
				$http.post(resturl + "/products/reviews/save", reqObj).then(function (resp) {
					$http.get(resturl + "/products/" + $routeParams.prodid + "/reviews").then(function (resp) {
						$scope.prod = resp.data;
						$scope.averagereview = resp.data.avgReview;
						$scope.userRatings = resp.data.reviewList;
						$scope.totalreview = resp.data.totalRatingCount;
						$scope.ratings = [{ number: $scope.averagereview }];
					});
					if (resp.data.status == 'true') {
						$scope.successMsg = resp.data.message;
						$('.successPopup').modal('show');
					}
					else {
						$scope.failureMsg = resp.data.message;
						$('.errorPopup').modal('show');
					}
					$scope.firstRate = 0;
					$scope.secondRate = 0;
					$scope.readOnly = true;
					giveReview.description = "";
				});
			};
		}
		// Get Vendor By Loggeed In User Pincode //
		$scope.getVendorsByUserPincode = function () {
			if (localStorage.loggedInUser != undefined) {
				$scope.err = false;
				$scope.notLoggedIn = false;
				$http.get(resturl + "/FindVendorsByProductId/" + $routeParams.prodid).then(function (resp) {
					if (resp.data.vendorsDataForProduct == null) {
						$scope.pagep = [{ "vendorId": 1402, "email": "admin@onesevenhome.com", "password": null, "confirmPassword": null, "vendorName": "OneSevenHome", "vendorOfficeAddress": null, "houseNumber": "Dilsukhnagar", "street": "16-11-741/C/2", "area": "Indira Nagar", "city": "Hyderabad", "state": "Telangana", "pinCode": "500036", "country": null, "vendorMobile": null, "vendorTelephone": "9848351151", "vendorFax": null, "vendorConstFirm": "Dealer", "vendorCompanyNature": "Large Scale", "vendorRegistrationNo": null, "vendorPAN": null, "vendorLicense": null, "vendorAuthCert": null, "vendorExpLine": null, "vendorMajorCust": null, "vatRegNo": null, "activationURL": null, "vendorTIN": null, "userProfile": null, "gst": null, "architectIds": [], "file1": null, "file2": null, "file3": null }];
					} else {
						$scope.pagep = resp.data.vendorsDataForProduct;
					}
					$scope.productpageLoaded = true;
					$scope.productvendorLoaded = false;
					$scope.slickproductpageConfig = {
						slidesToShow: 5,
						slidesToScroll: 1,
						prevNext: true,
						arrows: false,
						dots: true,
						autoplay: true,
						autoplaySpeed: 10000,
						speed: 500,
						slidesPerRow: 5,
						rows: 1,
					};
				});
			}
			else {
				$scope.err = false;
				$scope.resetBtn = false;
				$scope.notLoggedIn = true;
				$scope.message = "Please login to view vendor(s) in your location (or) search for vendor(s) using Pincode...";
			}
		};

		if (localStorage.loggedInUser != undefined) {
			$scope.getVendorsByUserPincode();
		}
		else {
			$scope.err = false;
			$scope.resetBtn = false;
			$scope.notLoggedIn = true;
			$scope.message = "Please login to view vendor(s) in your location (or) search for vendor(s) using Pincode...";
		}
		$scope.updateSelection = function (position, pagep, pagedesc) {
			$scope.vendorIdValue = pagedesc.vendorId;
			if ($(".vendorCheck").is(':checked')) {
				var id = $("#del_event").removeAttr('disabled');
			} else {
				$scope.id = $('#del_event').attr('disabled', 'disabled');
			}
			angular.forEach(pagep, function (pagedesc, index) {
				if (position != index)
					pagedesc.checked = false;
			});
		};
		$scope.addcart = function (quantity) {
			if ($scope.userlogged == false) {
				$location.path('/login');
			}
			else {
				if (quantity == undefined) {
					$scope.failureMsg = ' Enter quantity (atleast 1 item)';
					$('#errorModalPopup').modal('show');
				}
				else {
					var cartproduct = {
						"productId": $routeParams.prodid,
						"quantity": quantity,
						"vendorId": $scope.vendorIdValue
					};
					$http.post(resturl + "/cart/addShoppingCartItem?userId=" + localStorage.loggedInuserId, cartproduct).then(function (resp) {
						$scope.lengthofcart = resp.data.cartQuantity;
						$location.path("/cart");
					});
				}
			}
		};
		$http.get(resturl + "/cart/displayCart?userId=" + localStorage.loggedInuserId).then(function (resp) {
			$scope.cartlist = resp.data;
			if (resp.data.shoppingCartItems == null) {
				$scope.lengthofcart = 0;
			}
			else {
				$scope.lengthofcart = resp.data.shoppingCartItems.length;
			}
		});

		// Pincode wise Vendor List API Call //
		$scope.getpincode = function (postalCode) {
			$http.get(resturl + "/seachPincodeWiseVendors/" + $routeParams.prodid + "?postalCode=" + postalCode).then(function (resp) {
				if (resp.data.vendorsDataForProduct == null) {
					$scope.err = true;
					$scope.resetBtn = true;
					$scope.notLoggedIn = true;
					$scope.message = resp.data.status;					
					$scope.pagep = resp.data.vendorsDataForProduct;
				}
				else {
					$scope.pagep = resp.data.vendorsDataForProduct;
					$scope.err = false;
					$scope.notLoggedIn = false;
					$scope.resetBtn = false;
					$scope.productpageLoaded = true;
					$scope.slickvendorConfig = {
						slidesToShow: 5,
						slidesToScroll: 1,
						prevNext: true,
						arrows: false,
						dots: true,
						autoplay: true,
						autoplaySpeed: 10000,
						speed: 500,
						slidesPerRow: 5,
						rows: 1
					};
				}
				$scope.postalCode = "";
			});
		};

		$scope.openWriteReview = function () {
			$('#writeReviewModal').modal('show');
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