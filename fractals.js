var canvas = document.getElementById('canvas');
context = canvas.getContext('2d');
canvas.width = window.innerWidth - 40; 
canvas.height = window.innerHeight;

var start = { x:0, y:0 };
var end = { x:0, y:0 };
var x=0.,y=0.,xw=0.,yw=0.
var coeff = {}
var start_button_value = true
var restart_button_value = false
var start_button = document.getElementById('start');
var restart_button = document.getElementById('restart');

function getConfig(coeff){
    var oTable = document.getElementById('table');
    var rowLength = oTable.rows.length;
    for (i = 1; i < rowLength; i++){
        var oCells = oTable.rows.item(i).cells;
        var cellLength = oCells.length;
        coeff["f"+i] = {}
        for(var j = 1; j < cellLength; j++){
            coeff["f"+i][oTable.rows.item(0).cells.item(j).innerHTML] = parseFloat(oCells.item(j).innerHTML)
        }
    }
    return coeff
}

function animate(time){
    window.setTimeout(function () {
        if(start_button_value){
            barnsleyFern();
        }
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
    coeff = getConfig(coeff)
    var rand = Math.random()*100;
    var res;
    if(rand<=1){
        res = transformer(start.x,start.y, coeff.f1);
    }
    else if(rand<=8){
        res = transformer(start.x,start.y, coeff.f3);
    }
    else if(rand<=15){
        res = transformer(start.x,start.y, coeff.f4);
    }
    else{
        res = transformer(start.x,start.y, coeff.f2);
    }
    start.x = res.x;
    start.y = res.y;
    context.fillStyle="green"; 
    context.beginPath();
    context.arc(start.x*canvas.width/10 + canvas.width/2, -start.y*canvas.height/15+canvas.height, 1, 0, 2*Math.PI,false);
    context.closePath();
    context.fill();
}

start_button.onclick = function(e){
    console.log(start_button_value)
    start_button_value = !start_button_value
    start_button.value = start_button_value ? 'stop' : 'start';
}

restart_button.onclick = function(e){
    context.clearRect(0,0,canvas.width, canvas.height);
    start_button_value = false;
    start_button.value = 'start';
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
