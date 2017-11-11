var canvas = document.getElementById('canvas');
context = canvas.getContext('2d');
canvas.width = window.innerWidth - 40; 
canvas.height = window.innerHeight;

var start = { x:0, y:0 };
var end = { x:0, y:0 };
var x=0.,y=0.,xw=0.,yw=0.
var coeff = {
    f1: { a:0, b:0, c:0, d:0.16, e:0, f:0 },
    f4: { a:0.85, b:0.04, c:-0.04, d:0.85, e:0, f:1.60 },
    f2: { a:0.20, b:-0.26, c:0.23, d:0.22, e:0, f:1.60 },
    f3: { a:-0.15, b:0.28, c:0.26, d:0.24, e:0, f:0.44 }
};

function animate(time){
    window.setTimeout(function () {
        barnsleyFern();
        window.requestNextAnimationFrame(animate);
    }, 0);
    
}

var transformer = function(x,y,coeff){
    return {
        x:coeff.a*x + coeff.b*y + coeff.e,
        y:coeff.c*x + coeff.d*y + coeff.f
    }
}

var barnsleyFern = function(){
    var rand = Math.random()*100;
    var res;
    if(rand<=1){
        res = transformer(start.x,start.y, coeff.f1);
    }
    else if(rand<=8){
        res = transformer(start.x,start.y, coeff.f2);
    }
    else if(rand<=15){
        res = transformer(start.x,start.y, coeff.f3);
    }
    else{
        res = transformer(start.x,start.y, coeff.f4);
    }
    start.x = res.x;
    start.y = res.y;
    context.fillStyle="green"; 
    context.beginPath();
    context.arc(start.x*canvas.width/10 + canvas.width/2, -start.y*canvas.height/10+canvas.height, 1, 0, 2*Math.PI,false);
    context.closePath();
    context.fill();
}

//For Animation
window.requestNextAnimationFrame = (function () {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame  || window.msRequestAnimationFrame ||
	function (callback, element) { 
		// Assume element is visible 
		var self = this,                
		start,                
		finish;
		window.setTimeout( function () {               
			start =+new Date(); callback(start);               
			finish =+new Date();
    		self.timeout = 1000 / 60 -(finish - start);
		}, self.timeout);
	};
}
)
();

window.requestNextAnimationFrame(animate);
