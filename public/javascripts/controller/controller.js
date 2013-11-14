var MainCntl = function($scope, $route, $routeParams, $location) {
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
}




var ChatDataControl = function($scope, $http){

	$http.get('/getchatdata').success(function(data){
		$scope.chatlist = data;
	});

	var socket;
	var firstconnect = true; 
	function connect() {
	    if(firstconnect) {
	        socket = io.connect(null); 
	        socket.on('message', function(data){
	        	$('#message-content').prepend('<li>'+data.username+' says:'+data.message+' at('+data.time.second+')</li>');
	        });
	        firstconnect = false;
	    } else {
	        socket.socket.reconnect();
	    }
	}

	$scope.send = function(mess){
		socket.send(_Global.user+"$-$-$"+mess);
	}

	$scope.user = _Global.user;

	connect();

}
