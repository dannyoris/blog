angular.module('blog', []).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider.
      when('/home', {templateUrl: '/template/index.html', controller: ChatControl}).
      when('/login', {templateUrl: '/template/login.html', controller: LoginControl}).
      when('/logout', {templateUrl: '', controller: null}).
      when('/reg', {templateUrl: '/template/reg.html', controller: RegControl}).
      otherwise({redirectTo:'/home'});
    $locationProvider.html5Mode(true);
}]);