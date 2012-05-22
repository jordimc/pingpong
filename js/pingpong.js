/*******************************************


********************************************/
var pingpong = {};
	pingpong.pressedKeys = {};
	pingpong.movement = 5;
	pingpong.ball = {
		speed: 8,
		x: 150,
		y: 100,
		directionX: 1,
		directionY: 1
	}
	pingpong.scoreA = 0;
	pingpong.scoreB = 0;
	
var KEY = {
	UP: 38,
	DOWN: 40,
	W: 87,
	S: 83
}

$(function() {
	//Setting the interval of the loop to 30ms
	pingpong.timer = setInterval(gameloop, 30);
	
	//Adding to the pressedKeys array which keys is up and down
	$(document).keydown(function(e) {
		pingpong.pressedKeys[e.which] = true;
	});
	$(document).keyup(function(e) {
		pingpong.pressedKeys[e.which] = false;
	});

});

function gameloop() {
	movepaddles();
	moveball();
}


function moveball() {
	var playgroundHeight = parseInt($("#playground").height());
	var playgroundWidth = parseInt($("#playground").width());
	var ball = pingpong.ball;
	
	//Checking the bottom and top edge for rebounds
	if(ball.y + ball.speed*ball.directionY > playgroundHeight) ball.directionY = -1;
	if(ball.y + ball.speed*ball.directionY < 0) ball.directionY = 1;
	
	
	//Checking for paddle collision
	var paddleWidth = parseInt($("#paddleA").css("width"));

	//**************Checking Paddle A***********************
	var paddleAX = parseInt($("#paddleA").css("left")) + parseInt($("#paddleA").css("width"));
	var paddleAYTop = parseInt($("#paddleA").css("top"));
	var paddleAYBottom = parseInt($("#paddleA").css("top")) + parseInt($("#paddleA").css("height"));

	
	if((ball.x + ball.speed*ball.directionX < paddleAX) &&
		(ball.x + ball.speed*ball.directionX > paddleAX - (paddleWidth+5))) 
	{
		if((ball.y + ball.speed*ball.directionY <= paddleAYBottom) &&
			(ball.y + ball.speed*ball.directionY >= paddleAYTop)) 
		{
			//Ball touches the paddle
			ball.directionX = 1;
		}
	}

	//**************Checking Paddle B***********************
	var paddleBX = parseInt($("#paddleB").css("left"));
	var paddleBYTop = parseInt($("#paddleB").css("top"));
	var paddleBYBottom = parseInt($("#paddleB").css("top")) + parseInt($("#paddleB").css("height"));
	
	if((ball.x + ball.speed*ball.directionX >= paddleBX) && 
		(ball.x + ball.speed*ball.directionX < paddleBX + (paddleWidth+5))) 
	{
		if((ball.y + ball.speed*ball.directionY <= paddleBYBottom) &&
			(ball.y + ball.speed*ball.directionY >= paddleBYTop)) 
		{
			//Ball touches the paddle
			ball.directionX = -1;
		}
	}	


	//Checking the right edge
	if(ball.x + ball.speed*ball.directionX > playgroundWidth) 
	{	
		//Player B lost
		pingpong.scoreA++;
		$("#scoreA").html(pingpong.scoreA);
		ball.x = parseInt($("#playground").css("width")) / 2;
		ball.y = parseInt($("#playground").css("height")) / 2;
		$("#ball").css({
			"left": ball.x,
			"top" : ball.y
		});
		ball.directionX = 1;
	}
	
	//Checking the left edge
	if(ball.x + ball.speed*ball.directionX < 0) 
	{
		//Player A lost
		pingpong.scoreB++;
		$("#scoreB").html(pingpong.scoreB);
		ball.x = parseInt($("#playground").css("width")) / 2;
		ball.y = parseInt($("#playground").css("height")) / 2;
		$("#ball").css({
			"left": ball.x,
			"top" : ball.y
		});
		ball.directionX = 1;
	}


	//Next step of the moving the ball
	ball.x += ball.speed * ball.directionX;
	ball.y += ball.speed * ball.directionY;

	//Representing the new move of the ball into the screen
	$("#ball").css({
		"left" : ball.x,
		"top" : ball.y
	});

}


function movepaddles() {
	if(pingpong.pressedKeys[KEY.UP]) {
		//get the current paddle's B top value and then move it UP (substracting 5 px)
		var top = parseInt($("#paddleB").css("top"));
		$("#paddleB").css("top", top-pingpong.movement);
	}
	
	if(pingpong.pressedKeys[KEY.DOWN]) {
		//get the current paddle's B top value and then move it DOWN (adding 5 px)
		var top = parseInt($("#paddleB").css("top"));
		$("#paddleB").css("top", top+pingpong.movement);
	}

	if(pingpong.pressedKeys[KEY.W]) {
		//get the current paddle's A top value and then move it UP (substracting 5 px)
		var top = parseInt($("#paddleA").css("top"));
		$("#paddleA").css("top", top-pingpong.movement);
	}
	
	if(pingpong.pressedKeys[KEY.S]) {
		//get the current paddle's A top value and then move it DOWN (adding 5 px)
		var top = parseInt($("#paddleA").css("top"));
		$("#paddleA").css("top", top+pingpong.movement);
	}
}





