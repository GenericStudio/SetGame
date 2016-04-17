var SetGameApp = angular.module('SetGame', ['ngRoute']);

SetGameApp.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
  $routeProvider
    .when('/', {
      template: "<board></board>"
    });

  $locationProvider.html5Mode(true);

}]);