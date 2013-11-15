angular.module('blog', []).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider.
      when('/', {templateUrl: '/template/index.html', controller: ChatControl}).
      when('/login', {templateUrl: '/template/login.html', controller: LoginControl}).
      when('/reg', {templateUrl: '/template/reg.html', controller: RegControl}).
      otherwise({redirectTo: '/#/'});
    $locationProvider.html5Mode(true);
}]);