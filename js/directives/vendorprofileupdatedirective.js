angular.module('newapp')
  .directive('vendorprofileupdateDirective', function () {
    return {
		templateUrl: 'views/vendorprofileupdate.html',
		restrict: 'AE',
		replace: true,
		link: function postLink(scope, element, attrs) {
		}
	};
});