var MainCntl = function($scope, $route, $routeParams, $location) {
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
}

var PostAddControl = function($scope, $http){

	$scope.init = function(){
		KindEditor.create('textarea[name="content"]', {
		  allowFileManager : true
		});
	}

	$scope.send = function(post){
		console.log(post);
		if(post && post.title && post.content){
			
		}else{
			$scope.error = "标题和内容不能为空";
			$scope.isError = true;
			return false;
		}
	}
	$scope.init();
}