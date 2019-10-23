angular.module('newapp')
  .directive('sectionheaderDirective', function () {
    return {
		templateUrl: 'views/sectionheader.html',
		restrict: 'AE',
		replace: true,
		link: function postLink(scope, element, attrs) {
		}
	};
});