angular.module('newapp')
 .controller('profileCtrl',['$scope', '$http', '$location','resturl', function($scope, $http, $location,resturl) {
	$scope.typeOfSearch = [
		{name : "Category", value : "Category"},
		{name : "Brand", value : "Brand"},
		{name : "Product", value : "Product"}
	];
	if(localStorage.loggedInUser !=undefined){
		$scope.loggedInUser=localStorage.loggedInUser;
		$scope.loggedInUserName=localStorage.loggedInUserName;
		$scope.userlogged=true;
	} else {
		$scope.userlogged=false;
	}
	$scope.logout = function (){
		localStorage.clear();
		$location.path('/login');
	};
	$http.get(resturl+"/getAllCategories").then(function(resp) {
		$scope.menuitem = resp.data.categoryData;
	});
	$scope.mouseOver = function(param) {
		$scope.set_bg = function() {
		$scope.bgimg = param.imageURL;
			return {
				"background-image": "url(/clients/onesevenhome/img/" + $scope.bgimg + ".jpg)"
			};
		};
	};
	$http.get(resturl+"/cart/displayCart?userId="+localStorage.loggedInUserId).then(function(resp){
		$scope.cartlist=resp.data;
		$scope.lengthofcart = resp.data.shoppingCartItems.length;
	});
	$scope.lengthofcart =0;
	
	$scope.changepass = function (changePassword) {
	};
}]);