angular.module('newapp')
  .controller('activateuserCtrl',['$scope', '$http', '$location','resturl', function ($scope, $http, $location,resturl) {
	$scope.typeOfSearch = [
		{name : "Category", value : "Category"},
		{name : "Brand", value : "Brand"},
		{name : "Product", value : "Product"}
	];
	$http.post(resturl+"/user/activate", $location.search()).then(function(resp){
		$location.path('/login');
	});
}]);