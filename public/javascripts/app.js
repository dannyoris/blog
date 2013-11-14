angular.module('blog', []).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider.
      when('/', {templateUrl: '/template/index.html', controller: ChatDataControl}).
      otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }]);