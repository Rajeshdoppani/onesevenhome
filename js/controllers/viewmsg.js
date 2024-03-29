angular.module('newapp')
	.controller('viewmsgctrl', ['$scope', '$http', '$location', 'resturl', function ($scope, $http, $location, resturl) {
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
			$location.path('/profile');
		};
		$http.get(resturl + "/getAllCategories").then(function (resp) {
			$scope.menuitem = resp.data.categoryData;
		});

		$http.get("js/controllers/myaccount.json").then(function (resp) {
			$scope.account = resp.data.myacc;
		});
		$http.get("js/controllers/order.json").then(function (resp) {
			$scope.myorder = resp.data.order;
		});
		$http.get("js/controllers/myaccproductlist.json").then(function (resp) {
			$scope.mplist = resp.data.myaccplist;
		});
		$http.get("js/controllers/myaccwishlist.json").then(function (resp) {
			$scope.mwlist = resp.data.myaccwlist;
		});
		$http.get("js/controllers/inboxread.json").then(function (resp) {
			$scope.readmsg = resp.data.read;
		});
		$http.get("js/controllers/inboxunread.json").then(function (resp) {
			$scope.unreadmsg = resp.data.unread;
		});
		$http.get("js/controllers/viewmsg.json").then(function (resp) {
			$scope.vmsg = resp.data.viewmsg;
		});
		$http.get(resturl + "/cart/displayCart?userId=" + localStorage.loggedInUserId).then(function (resp) {
			$scope.cartlist = resp.data;
			$scope.lengthofcart = resp.data.shoppingCartItems.length;
		});
		$scope.lengthofcart = 0;
	}]);