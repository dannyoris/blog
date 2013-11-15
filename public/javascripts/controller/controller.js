var MainCntl = function($scope, $route, $routeParams, $location) {
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
}




var ChatControl = function($scope, $http){


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



var LoginControl = function($scope, $http){
	$scope.submit = function(user){
		$http.post('/login',user).success(function(data){
			if(data.success){
				_Global.user = data.success;
				$scope.$location.path('/');
			}else{
				$scope.error = data.error;
			}
		});
	}
}


var RegControl = function($scope, $http){
	$scope.reg = function(user){


		if(user && user.username && user.password){
			$http.post('/reg',user).success(function(data){
				if(data.success){
					_Global.user = data.success;
					$scope.$location.path('/login');
				}else{
					$scope.error = data.error;
				}
			});
		}else{
			$scope.error = "账号或密码不能为空";
			return;
		}

	}
}