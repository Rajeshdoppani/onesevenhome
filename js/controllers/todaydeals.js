angular.module('newapp')
	.controller('TodaydealsCtrl', ['$scope', '$http', '$location', 'resturl', function ($scope, $http, $location, resturl) {
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
		$scope.mouseOver = function (param) {
			$scope.set_bg = function () {
				$scope.bgimg = param.imageURL;
				return {
					"background-image": "url(/clients/onesevenhome/img/" + $scope.bgimg + ".jpg)"
				};
			};
		};
		$scope.logout = function () {
			localStorage.clear();
			$location.path('/login');
		};
		$scope.myProfile = function () {
			$location.path('/myaccount');
		};
		if (localStorage.loggedInuserId == undefined) {
			$scope.showSignUp = true;
		}
		else {
			$scope.showSignUp = false;
		}

		$http.get(resturl + "/getAllCategories").then(function (resp) {
			$scope.menuitem = resp.data.categoryData;
		});

		$http.get(resturl + "/getRecommendedProduct").then(function (resp) {
			$scope.recommend = resp.data.recommendedProducts;
			$scope.RecomendLoaded = true;
			$scope.slickrecommendedprocutsConfig = {
				dots: false,
				arrows: false,
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
				autoplayspeed: 500
			};
		});
		$scope.todaycat = function (position, menuitem, x) {
			$scope.title = x.title;
			angular.forEach(menuitem, function (x, index) {
				if (position != index)
					x.checked = false;
			});
		};

		//Active
		var payload = {
			"status": 1,
		};
		$http.post(resturl + "/getTodaysDeals" + "?" + "pageNumber=1&pageSize=12", payload).then(function (resp) {
			$scope.deal = resp.data.todaysDealsData;
			$scope.totalCount = resp.data.paginationData.totalCount;
			console.log($scope.deal);
			var disArray = [];
			for (abc = 0; abc < resp.data.todaysDealsData.length; abc++) {
				disArray[abc] = "display" + abc;
			}
			for (i = 0; i < resp.data.todaysDealsData.length; i++) {
				if (resp.data.todaysDealsData[i].discountPercentage == undefined || resp.data.todaysDealsData[i].discountPercentage == null) {
					$scope.showTag = disArray[i];
					$scope[$scope.showTag] = false;
				} else {
					$scope.showTag = disArray[i];
					$scope[$scope.showTag] = true;
				}
			}
		});
		$scope.page = 1;
		$scope.PagingAct = function (page, pageSize, total) {
			$http.post(resturl + "/getTodaysDeals" + "?" + "pageNumber=" + page + "&pageSize=12", payload).then(function (resp) {
				$scope.deal = resp.data.todaysDealsData;
				$scope.totalCount = resp.data.paginationData.totalCount;
			});
		};
		$scope.todaycat = function (position, menuitem, x) {
			$scope.title = x.title;
			angular.forEach(menuitem, function (x, index) {
				if (position != index)
					x.checked = false;
			});
			var payload = {
				"status": 1,
				"categoryCode": $scope.title
			};
			$http.post(resturl + "/getTodaysDealsForCat" + "?" + "pageNumber=1&pageSize=12", payload).then(function (resp) {
				$scope.deal = resp.data.todaysDealsData;
				$scope.totalCount = resp.data.paginationData.totalCount;
				$scope.page = 1;
				$scope.PagingAct = function (page, pageSize, total) {
					$http.post(resturl + "/getTodaysDealsForCat" + "?" + "pageNumber=" + page + "&pageSize=12", payload).then(function (resp) {
						$scope.deal = resp.data.todaysDealsData;
						$scope.totalCount = resp.data.paginationData.totalCount;
					});
				};
			});
		};

		//Active click
		$scope.active = function () {
			var payload = {
				"status": 1,
				"category": $scope.title
			};
			$http.post(resturl + "/getTodaysDeals" + "?" + "pageNumber=1&pageSize=12", payload).then(function (resp) {
				$scope.deal = resp.data.todaysDealsData;
				$scope.totalCount = resp.data.paginationData.totalCount;
			});
			$scope.page = 1;
			$scope.PagingAct = function (page, pageSize, total) {
				$http.post(resturl + "/getTodaysDeals" + "?" + "pageNumber=" + page + "&pageSize=12", payload).then(function (resp) {
					$scope.deal = resp.data.todaysDealsData;
					$scope.totalCount = resp.data.paginationData.totalCount;
				});
			};
			$scope.todaycat = function (position, menuitem, x) {
				$scope.title = x.title;
				angular.forEach(menuitem, function (x, index) {
					if (position != index)
						x.checked = false;
				});
				var payload = {
					"status": 0,
					"category": $scope.title
				};
				$http.post(resturl + "/getTodaysDeals" + "?" + "pageNumber=1&pageSize=12", payload).then(function (resp) {
					$scope.deal = resp.data.todaysDealsData;
					$scope.totalCount = resp.data.paginationData.totalCount;
				});
			};
		};
		//Expired
		$scope.Expired = function () {
			var payload = {
				"status": 0,
				"category": $scope.title
			};
			$http.post(resturl + "/getTodaysDeals" + "?" + "pageNumber=1&pageSize=12", payload).then(function (resp) {
				$scope.deal = resp.data.todaysDealsData;
				$scope.totalCount = resp.data.paginationData.totalCount;
			});
			$scope.page = 1;
			$scope.PagingAct = function (page, pageSize, total) {
				$http.post(resturl + "/getTodaysDeals" + "?" + "pageNumber=" + page + "&pageSize=12", payload).then(function (resp) {
					$scope.deal = resp.data.todaysDealsData;
					$scope.totalCount = resp.data.paginationData.totalCount;
				});
			};
			$scope.todaycat = function (position, menuitem, x) {
				$scope.title = x.title;
				angular.forEach(menuitem, function (x, index) {
					if (position != index)
						x.checked = false;
				});
				var payload = {
					"status": 0,
					"categoryCode": $scope.title
				};
				$http.post(resturl + "/getTodaysDealsForCat" + "?" + "pageNumber=1&pageSize=12", payload).then(function (resp) {
					$scope.deal = resp.data.todaysDealsData;
					$scope.totalCount = resp.data.paginationData.totalCount;
					$scope.page = 1;
					$scope.PagingAct = function (page, pageSize, total) {
						$http.post(resturl + "/getTodaysDealsForCat" + "?" + "pageNumber=" + page + "&pageSize=12", payload).then(function (resp) {
							$scope.deal = resp.data.todaysDealsData;
							$scope.totalCount = resp.data.paginationData.totalCount;
						});
					};
				});
			};
		};
		//Upcoming
		$scope.Upcoming = function (x) {
			var payload = {
				"status": 2
			};
			$http.post(resturl + "/getTodaysDeals" + "?" + "pageNumber=1&pageSize=12", payload).then(function (resp) {
				$scope.deal = resp.data.todaysDealsData;
				$scope.totalCount = resp.data.paginationData.totalCount;
			});
			$scope.page = 1;
			$scope.PagingAct = function (page, pageSize, total) {
				$http.post(resturl + "/getTodaysDeals" + "?" + "pageNumber=" + page + "&pageSize=12", payload).then(function (resp) {
					$scope.deal = resp.data.todaysDealsData;
					$scope.totalCount = resp.data.paginationData.totalCount;
				});
			};
			$scope.todaycat = function (position, menuitem, x) {
				$scope.title = x.title;
				angular.forEach(menuitem, function (x, index) {
					if (position != index)
						x.checked = false;
				});
				var payload = {
					"status": 2,
					"categoryCode": $scope.title
				};
				$http.post(resturl + "/getTodaysDealsForCat" + "?" + "pageNumber=1&pageSize=12", payload).then(function (resp) {
					$scope.deal = resp.data.todaysDealsData;
					$scope.totalCount = resp.data.paginationData.totalCount;
					$scope.page = 1;
					$scope.PagingAct = function (page, pageSize, total) {
						$http.post(resturl + "/getTodaysDealsForCat" + "?" + "pageNumber=" + page + "&pageSize=12", payload).then(function (resp) {
							$scope.deal = resp.data.todaysDealsData;
							$scope.totalCount = resp.data.paginationData.totalCount;
						});
					};
				});
			};
		};
		$http.get(resturl + "/getRecentBought").then(function (resp) {
			$scope.recently = resp.data.recentlyBought;
			$scope.RecentlyLoaded = true;
			$scope.slickrecentbroughtConfig = {
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
							centerPadding: '0px',
							slidesToShow: 3,
							slidesToScroll: 1
						}
					},
					{
						breakpoint: 800,
						settings: {
							arrows: false,
							centerMode: true,
							centerPadding: '0px',
							slidesToShow: 2,
							slidesToScroll: 1
						}
					},
					{
						breakpoint: 767,
						settings: {
							arrows: false,
							centerMode: true,
							centerPadding: '0px',
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			};
		});
		$http.get(resturl + "/cart/displayCart?userId=" + localStorage.loggedInuserId).then(function (resp) {
			$scope.cartlist = resp.data;
			if (resp.data.shoppingCartItems == null) {
				$scope.lengthofcart = 0;
			} else {
				$scope.lengthofcart = resp.data.shoppingCartItems.length;
			}
		});
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
