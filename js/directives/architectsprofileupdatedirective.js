angular.module('newapp')
  .directive('architectsprofileupdateDirective', function () {
    return {
		templateUrl: 'views/Architectsprofileupdate.html',
		restrict: 'AE',
		replace: true,
		link: function postLink(scope, element, attrs) {
		}
	};
});