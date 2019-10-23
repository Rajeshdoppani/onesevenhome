angular.module('newapp')
  .directive('wallpaperprofileupdateDirective', function () {
    return {
		templateUrl: 'views/wallpaperupdateprofile.html',
		restrict: 'AE',
		replace: true,
		link: function postLink(scope, element, attrs) {
		}
	};
});