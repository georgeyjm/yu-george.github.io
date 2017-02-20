setTimeout(function(){
	document.getElementById('bgBlurred').style.opacity = 1;
}, 1000);

var boingSfx = new Audio('audios/boing.wav');
var avatar = document.getElementById('avatar');

avatar.addEventListener('mousedown', function() {
	setTimeout(function() {
		boingSfx.currentTime = 0;
		boingSfx.play();}, 200);
})