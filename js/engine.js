// -----M-O-D-E-L----- //

var players = [
	{
		name: "Lionel Messi",
		image: "img/lm10.jpg",
	},
	{
		name: "Neymar Jr.",
		image: "img/nj11.jpg",
	},
	{
		name: "Luis Suarez",
		image: "img/ls9.jpg",
	},
	{
		name: "Cristiano Ronaldo",
		image: "img/cr7.jpg",
	},
	{
		name: "Gareth Bale",
		image: "img/gb11.jpg",
	},
	{
		name: "Luka Modric",
		image: "img/lum10.jpg",
	},
	{
		name: "Sergio Aguero",
		image: "img/sa10.jpg",
	},
	{
		name: "Eden Hazard",
		image: "img/eh10.jpg",
	},
];

/* Global variables */
var pair = 0;
var moves = 0;
var src;
var id;
var timeElapsed = 0;
var hasSrc = [];
var hasId = [];


// -----V-I-E-W-M-O-D-E-L----- //
var rungame = function() {
	//console.log(2);
	function createCards(players) {
		//console.log(1);
		var allCards = ' ';
		var id = 0;
		for(var j = 0; j<2; j++)
			for(var i = 0; i < players.length; i++) {
				allCards = allCards + '<div class="flipper col-xs-offset-12 col-sm-offset-6 col-md-offset-3" id="'+id+'"><div class="front"><img src="img/cover.jpg" class="img-responsive card"/></div><div class="back"><img src="'+players[i].image+'" class="img-responsive card"/></div></div>';
				id++;
			}
		$(".fliprow").html(allCards);
	}
	
	createCards(players);
	 
	 function shuffleArray(players) {
		for(var i = players.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = players[i];
			players[i] = players[j];
			players[j] = temp;
		}
		return players;
	}
	
	shuffleArray(players);
	 
	 function flipCard(self) {
		 console.log("flip");
		 $(self).toggleClass('active');
	 }
	 
	 // initialize a interval function to update time at every 1 second.
	 var timer = setInterval(function() {
     timeElapsed += 1;
     $('#time').html(" " + timeElapsed);
     }, 1000);
	 
	 function matchCards() {
		 console.log("click");
		 flipCard(this);
		 
		 id = $(this).attr('id');
		 src = $($($(this).children()[1]).children()[0]).attr("src");
		 
		 moves += 1;
		if(moves % 2 == 0)
		{
			temp = moves/2;
			$("#moves").html(temp);
		}
		
		 if(hasSrc.length < 2 && hasId.length < 2)
		 {
			 hasSrc.push(src);
			 hasId.push(id);
			 if(hasId.length == 1)
				 $(this).off('click');
		 }
		 if(hasSrc.length == 2 && hasId.length == 2)
		 {
			 if(hasSrc[0] == hasSrc[1] && hasId[0] != hasId[1])
			 {
				 pair += 1;
				  $.each(hasId, function(index) {
					  $('#'+hasId[index]+'').off("click");
				  });
				 
				 console.log(pair + "xsd");
			 }
			  else
		     {
					 $.each(hasId, function (index, open) {
						console.log(hasId);
						setTimeout( function() {
							flipCard('#'+open+'');
						}, 600);
						
					 });
					 $('#'+hasId[0]+'').on("click", matchCards);
			 }
			 hasSrc = [];
			 hasId = [];
		 }

	 }
	 
	 $('.flipper').on('click', matchCards);		
	
};

rungame();