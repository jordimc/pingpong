
var KEY = {
	UP: 38,
	DOWN: 40,
	W: 87,
	S: 83
}

var movement = 5;


//Getting the user input
$(function() {
	$(document).keydown(function(e) {
		switch(e.which) {
			case KEY.UP: 
				//get the current paddle's B top value and then move it UP (substracting 5 px)
				var top = parseInt($("#paddleB").css("top"));
				$("#paddleB").css("top", top-movement);
				break;
			
			case KEY.DOWN:
				//get the current paddle's B top value and then move it DOWN (adding 5 px)
				var top = parseInt($("#paddleB").css("top"));
				$("#paddleB").css("top", top+movement);
				break;
			case KEY.W: 
				//get the current paddle's A top value and then move it UP (substracting 5 px)
				var top = parseInt($("#paddleA").css("top"));
				$("#paddleA").css("top", top-movement);
				break;
			case KEY.S:
				//get the current paddle's A top value and then move it DOWN (adding 5 px)
				var top = parseInt($("#paddleA").css("top"));
				$("#paddleA").css("top", top+movement);
				break;
		}
	});
});
