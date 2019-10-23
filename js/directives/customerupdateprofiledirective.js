angular.module('newapp')
  .directive('customerupdateprofileDirective', function () {
    return {
		templateUrl: 'views/customerupdateprofile.html',
		restrict: 'AE',
		replace: true,
		link: function postLink(scope, element, attrs) {
		}
	};
});