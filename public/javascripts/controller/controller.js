var MainCntl = function($scope, $route, $routeParams, $location) {
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
}


var ChatControl = function($scope, $http){

	$http.get('/getuser').success(function(user){
		if(user && user.username){
			_Global.user = user.username;
			$scope.user = user.username;
			$http.get('/getchatdata').success(function(data){
				$scope.chatlist = data;
			});
		}else{
			//$scope.$location.path('/login');
			location.href = '/login';
		}
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

	$scope.send = function(content){
		if(content){			
			$scope.isError = false;
			$scope.content = "";
			socket.send(_Global.user+"$-$-$"+content);
		}else{
			$scope.error = "请先输入内容";
			$scope.isError = true;
		}
	}
	connect();
}



var LoginControl = function($scope, $http){
	$scope.login = function(user){
		$http.post('/login',user).success(function(data){
			if(data.success){
				$scope.$location.path('/home');
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




var PostAddControl = function($scope, $http){
	var editor;
	KindEditor.ready(function(K) {
		editor = K.create('textarea[name="content"]', {
		  allowFileManager : true
		});
	});
	
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