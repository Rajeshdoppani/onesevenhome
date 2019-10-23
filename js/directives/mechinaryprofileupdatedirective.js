angular.module('newapp')
  .directive('mechinaryprofileupdateDirective', function () {
    return {
		templateUrl: 'views/mechinaryprofileupdate.html',
		restrict: 'AE',
		replace: true,
		link: function postLink(scope, element, attrs) {
		}
	};
});