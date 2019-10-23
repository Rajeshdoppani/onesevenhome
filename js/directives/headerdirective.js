angular.module('newapp')
  .directive('headerDirective', function () {
    return {
		templateUrl: 'views/header.html',
		restrict: 'AE',
		replace: true,
		link: function postLink(scope, element, attrs) {
		}
	};
});