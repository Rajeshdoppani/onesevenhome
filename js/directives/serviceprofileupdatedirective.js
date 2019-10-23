angular.module('newapp')
  .directive('serviceprofileupdateDirective', function () {
    return {
		templateUrl: 'views/serviceprofileupdate.html',
		restrict: 'AE',
		replace: true,
		link: function postLink(scope, element, attrs) {
		}
	};
});