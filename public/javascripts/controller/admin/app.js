angular.module('blog', []).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider.
      when('/admin/post/add', {templateUrl: '/template/admin/post/add.html', controller: PostAddControl}).
      otherwise({redirectTo:'/home'});
    $locationProvider.html5Mode(true);
}]);