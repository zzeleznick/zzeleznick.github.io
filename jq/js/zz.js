  var input = {
        it1: 0,
        it2: 0,
        it3: 0,
        it4: 0,
    }


var options = {};
	options.animation = true;
	//this represents the global piechart
var cdata = [
		{
			value: 10,
			color:"#637b85"
		},
		{
			value : 10,
			color : "#2c9c69"
		},
		{
			value : 10,
			color : "#dbba34"
		},
		{
			value : 10,
			color : "#c62f29"
		}

];

//this represents the linechart data
var ldata = {
		labels : ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
		datasets : [
			{
				fillColor : "rgba(99,123,133,0.4)",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,220,220,1)",
				pointStrokeColor : "#fff",
				data : [65,54,30,81,56,55,40]
			},
			{
				fillColor : "rgba(219,186,52,0.4)",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,220,220,1)",
				pointStrokeColor : "#fff",
				data : [20,60,42,58,31,21,50]
			},
		]
	}




$(document).ready(function(){
  

  $("#b2").click(function(){
    for (keys in input) {
        var ans = prompt('type bitch');
        //note that isNaN("2") and isNan(2) both return true; parseInt("2") not req
        //aaah isNaN(null) == true
        ans = parseInt(ans);
        if (isNaN(ans)){
        	ans = 5;
        }
         //but prompt still returns a string!
        input[keys] = ans;
    }
    alert('next part');
    for (keys in input) {
         console.log(input[keys]);
    }
    var i = 0;
	for (keys in input) {
         cdata[i].value = input[keys];
         i++;
    }
   });  //end b2 donut zz

$("#b4").click(function(){
	var text = document.getElementById("scrape").value;
	var choice = document.getElementById("gselector").value;
	choice = parseInt(choice);
	text = text.split(" ");
	for (var i = 0; i< text.length; i++) {
		text[i] = parseInt(text[i]);
		if (isNaN(text[i])) {          
			text[i] = Math.floor(Math.random()*20 + Math.random()*50);	
		}
		if ( i >= ldata.datasets[choice-1].data.length) {
			break;
		}
		ldata.datasets[choice-1].data[i] = text[i];
		//alert(text[i]);
	}
  
   });  //end b4 line zz

  $("#b3").click(function(){
    for (keys in input) {
        var ans = prompt('type bitch');
        //note that isNaN("2") and isNan(2) both return true; parseInt("2") not req
        //aaah isNaN(null) == true
        ans = parseInt(ans);
        if (isNaN(ans)){
        	ans = 5;
        }
         //but prompt still returns a string!
        input[keys] = ans;
    }
    alert('next part');
    for (keys in input) {
         console.log(input[keys]);
    }
    var i = 0;
	for (keys in input) {
         cdata[i].value = input[keys];
         i++;
    }
   });  //end b2 donut zz


});



(function main(){
var t;
function size(animate){
	if (animate == undefined){
		animate = false;
	}
	clearTimeout(t);
	t = setTimeout(function(){
		$("canvas").each(function(i,el){
			$(el).attr({
				"width":$(el).parent().width(),
				"height":$(el).parent().outerHeight()
			});
		});
		redraw(animate);
		var m = 0;
		$(".widget").height("");
		$(".widget").each(function(i,el){ m = Math.max(m,$(el).height()); });
		$(".widget").height(m);
	}, 30);
}
$(window).on('resize', function(){ size(false); });
$("#b2").on('click', function(){ size(false); });  //zz adjustment
$("#b4").on('click', function(){ size(false); });  //zz adjustment
$( "#rotator" ).click(function() {
  //$( this ).slideUp();
  //cdata[0].value =100;
	  if ($( this ).hasClass("rotator")) {
	  	$( this ).removeClass("rotator")
	  }
	  else {
	  $( this ).addClass("rotator")
	}
}); //end rotation

$("#rotator").hover(function() {
  $("#rotator").css("cursor","pointer");
});  //pointer ability

function popup() {
  alert( "Data Received" );
}
$( "button" ).on( "hover", popup);

//note that having these attributes publicly accessible would not be ideal for production

/*function notify() {
  alert( "Data Received" );
}
$( "button" ).on( "click", notify );
*/


function redraw(animation){
	var options = {};
	if (!animation){
		options.animation = false;
	} else {
		options.animation = true;
	}

//Begin try block zz donut
	try {
	var canvas = document.getElementById("hours");
	var ctx = canvas.getContext("2d");
	new Chart(ctx).Doughnut(cdata, options);

	}
	catch (e1) {
	console.log(e1);
	//catches error returns orginal 	
	console.log("stupido");

	var data = [
		{
			value:  20,
			color:"#637b85"
		},
		{
			value : 30,
			color : "#2c9c69"
		},
		{
			value : 40,
			color : "#dbba34"
		},
		{
			value : 10,
			color : "#c62f29"
		}

	];

	var canvas = document.getElementById("hours");
	var ctx = canvas.getContext("2d");
	new Chart(ctx).Doughnut(data, options);
}

//Begin line chart

	/*var data = {
		labels : ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
		datasets : [
			{
				fillColor : "rgba(99,123,133,0.4)",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,220,220,1)",
				pointStrokeColor : "#fff",
				data : [65,54,30,81,56,55,40]
			},
			{
				fillColor : "rgba(219,186,52,0.4)",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,220,220,1)",
				pointStrokeColor : "#fff",
				data : [20,60,42,58,31,21,50]
			},
		]
	}*/
	var canvas = document.getElementById("shipments");
	var ctx = canvas.getContext("2d");
	new Chart(ctx).Line(ldata, options);

//end line chart


	var data = {
		labels : ["Helpful","Friendly","Kind","Rude","Slow","Frustrating"],
		datasets : [
			{
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "#637b85",
				pointColor : "#dbba34",
				pointStrokeColor : "#637b85",
				data : [65,59,90,81,30,56]
			}
		]
	}
	var canvas = document.getElementById("departments");
	var ctx = canvas.getContext("2d");
	new Chart(ctx).Radar(data, options);
}
size(true);

}());