var keyRects  = new Array;
var keyStates = new Array;
var kWidth = 20;
var wkHeight = 80;
var bkHeight = 50;
var kMargin = 2;
var blackKeys = [1,3,6,8,10];
var whiteKeys = [0,2,4,5,7,9,11];

var two = new Two({ fullscreen: true, autostart: true }).appendTo(document.body);
var whiteLayer = two.makeGroup();
var blackLayer = two.makeGroup();

$(function() 
{
	var whiteCount = 0;
	var blackCount = 0;
	var bx = 0;
	var wx = 0;
	var y = 100;
	var offsetX = 0;
	var offsetY = wkHeight/2;
	
 	for(var i = 0; i < 82; i++)
 	{
		var k = i % 12;
		
		if(blackKeys.indexOf(k) != -1)
		{
			blackCount++;
			
			if(k == 6 || k == 1)
			{
				bx += (kWidth + kMargin)*2;
			}
			else
			{
				bx += (kWidth + kMargin);
			}
			
			console.log(bx);
			
			// This may look add due to shape origins defined by their centers
			keyRects.push( two.makeRectangle(bx + offsetX + kWidth/2, y - wkHeight/2 + bkHeight/2 + offsetY, kWidth, bkHeight) );
			keyRects[i].fill = "black";
			blackLayer.add(keyRects[i]);
			keyStates[keyRects[i].id + "_color"] = "black";
	  	}
	  	else
	  	{
		  	y = 100;
		 	whiteCount++;
		 	wx = whiteCount * (kWidth + kMargin) + 20;
		 	keyRects.push( two.makeRectangle(wx + offsetX, y + offsetY, kWidth, wkHeight) );
		 	keyRects[i].fill = "white";
		 	whiteLayer.add(keyRects[i]);
		 	keyStates[keyRects[i].id + "_color"] = "white";
	  	}
	  
	  	keyStates[keyRects[i].id + "_state"] = false;
	 
	  	two.update();
	  
	  	$(keyRects[i]._renderer.elem).click(keyClicked);
	}

  two.bind('update', function(frameCount, timeDelta) { });
  
});

function inBounds(rectangle)
{
	
}

function keyClicked(e)
{
	var key = e.target;
	keyStates[key.id + "_state"] = !keyStates[key.id + "_state"];
	alert("STATE: " + keyStates[key.id + "_state"]);
	//alert("num " + key.numm);
}

function Key(num)
{
	this.rect = two.makeRectangle(num, num, num + 1, num + 1);
	this.rect.numm = num;
	
	this.number = num;
  	this.state = 0;
} 

/*
// Make an instance of two and place it on the page.
var elem = document.getElementById('draw-shapes');
var params = { width: 285, height: 200 };
var two = new Two( {fullscreen: true, autostart: true} ).appendTo(document.body);
      

// two has convenience methods to create shapes.
var circle = two.makeCircle(72, 100, 50);
var rect = two.makeRectangle(213, 100, 100, 100);

// The object returned has many stylable properties:
circle.fill = '#FF8000';
circle.stroke = 'orangered'; // Accepts all valid css color
circle.linewidth = 5;

rect.fill = 'rgb(0, 200, 255)';
rect.opacity = 0.75;
rect.noStroke();

// Don't forget to tell two to render everything
// to the screen
two.update();

/*
var _canvas = document.getElementById("a");
var ctx = _canvas.getContext("2d");

var _bKeys;
var _wKeys;

_canvas.addEventListener("click", onClick);

setCanvasSize();
fillBackground();
drawKeyboard();


function setCanvasSize()
{
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
}

function fillBackground()
{
	ctx.beginPath();
	ctx.rect(0, 0, window.innerWidth, window.innerHeight);
	ctx.fillStyle = '#1f92ff';
	ctx.fill();
}

function drawKeyboard()
{
	var posX = 100;
	var posY = 100;
	var kHeight = 33;
	var kWidth = 11;	
	var kMargin = 2;
	var x, y;
	
	for(var k = 0;  k < 49; k++)
	{
		x = k * (kWidth + kMargin);
		y = 0;
		
		ctx.beginPath();
		ctx.rect(posX + x, posY+ y, kWidth, kHeight  + kHeight*0.666);
		ctx.fillStyle = 'white';
		ctx.fill();
	}

	x = 0;
	y = 0;
	
	for(var k = 0; k < 35; k++)
	{
		mod = k % 5;
		
		if( (mod == 0) || (mod/2) == 1.0 )
		{
			x += (kWidth + kMargin)*2;	
		}
		else
		{
			x += kWidth + kMargin;	
		}
		
		console.log("mod" + k);
		ctx.beginPath();
		ctx.rect(posX + x - (kWidth+kMargin + (kWidth + kMargin)/2.0), posY + y, kWidth, kHeight);
		ctx.fillStyle = '#242425';
		ctx.fill();
	}
}


function bPattern(moduloNum)
{
	//console.log("test " + moduloNum);
	
	var bInx = [1,3,6,8,10];
	
	for(var i = 0; i < bInx.length; i++)
	{
		if(moduloNum / bInx[i] == 1.0)
		{
			
			return true;
		} 
	}
}

function wPattern(moduloNum)
{
	var wInx = [0,2,4,5,7,9,11];
	
	if(moduloNum == 0)
	{
		return true;
	}
	
	for(var i = 0; i < wInx.length; i++)
	{
		if(moduloNum / wInx[i] == 1.0)
		{
			return true;
		} 
	}
}

function onClick(e)
{
	alert("X : " + e.pageX + " Y : " + e.pageY);
}




/*
// Draw the face
context.fillStyle = "yellow";
context.beginPath();
context.arc(95, 85, 40, 0, 2*Math.PI);
context.closePath();
context.fill();
context.lineWidth = 2;
context.stroke();
context.fillStyle = "black";

// Draw the left eye
context.beginPath();
context.arc(75, 75, 5, 0, 2*Math.PI);
context.closePath();
context.fill();

// Draw the right eye
context.beginPath();
context.arc(114, 75, 5, 0, 2*Math.PI);
context.closePath();
context.fill();

// Draw the mouth
context.beginPath();
context.arc(95, 90, 26, Math.PI, 2*Math.PI, true);
context.closePath();
context.fill();

// Write "Hello, World!"
context.font = "30px Garamond";
context.fillText("Hello, World!",15,175);
*/