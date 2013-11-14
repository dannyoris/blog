var socket;
var firstconnect = true; 
function connect() {
    if(firstconnect) {
        socket = io.connect(null); 
        socket.on('message', function(data){ message(data); });
        firstconnect = false;
    } else {
        socket.socket.reconnect();
    }
}
 
 
function message(data) {
    var _old = document.getElementById('message').innerHTML;    
    document.getElementById('message').innerHTML = '<li>'+data.username+' says:'+data.message+' at('+data.time+')</li>' + _old;
}
 
function send() {
    var val = document.getElementById('Content').value;
    socket.send(user+"$-$-$"+val);
}

/*function getOld(){
    var data = HTMLDecode("<%=chatdata%>");
    document.getElementById('message').innerHTML = data;
}
getOld();*/
connect();