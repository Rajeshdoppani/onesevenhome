angular.module('newapp')
  .directive('orderdirDirective', function () {
    return {
		templateUrl: 'views/orderdir.html',
		restrict: 'AE',
		replace: true,
		link: function postLink(scope, element, attrs) {
		}
	};
});