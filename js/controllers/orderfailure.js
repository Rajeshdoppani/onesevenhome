angular.module('newapp') 
  .controller('orderFailureCtrl',['$scope','$http', '$location','resturl', function ($scope,$http, $location,resturl) {
	  $scope.typeOfSearch = [
		{name : "Category", value : "Category"},
		{name : "Brand", value : "Brand"},
		{name : "Product", value : "Product"}
	];
	if(localStorage.loggedInUser !=undefined){
		$scope.loggedInUser=localStorage.loggedInUser;
		$scope.loggedInUserName=localStorage.loggedInUserName;
		$scope.userlogged=true;
		// Display Cart Service Call //
		$http.get(resturl+"/cart/displayCart?userId="+localStorage.loggedInuserId).then(function(resp){
			$scope.cartlist=resp.data;
			if(resp.data.shoppingCartItems == null) {
				$scope.lengthofcart = 0;
			}
			else {
				$scope.lengthofcart = resp.data.shoppingCartItems.length;
			}
		});
	}
	else{
		$scope.userlogged=false;
		$scope.lengthofcart = 0;
	}
	$scope.logout = function (){
		localStorage.clear();
		$location.path('/login');
	};
	$scope.myProfile = function () {
		$location.path('/myaccount');
	};
	$http.get(resturl+"/getAllCategories").then(function(resp) {
		$scope.menuitem = resp.data.categoryData;
	});
	
	// Page Navigation To Top Functionality //
	jQuery(window).scroll(function() {
		if (jQuery(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
			jQuery('#return-to-top').fadeIn(200);    // Fade in the arrow
		} else {
			jQuery('#return-to-top').fadeOut(200);   // Else fade out the arrow
		}
	});
	jQuery('#return-to-top').click(function() {      // When arrow is clicked
		jQuery('body,html').animate({
			scrollTop : 0                       // Scroll to top of body
		}, 500);
	});
}]);