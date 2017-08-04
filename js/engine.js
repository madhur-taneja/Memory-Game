// -----M-O-D-E-L----- //

var players = [{
        name: "Lionel Messi",
        image: "img/lm10.jpg",
    },
    {
        name: "Neymar Jr.",
        image: "img/nj11.jpg",
    },
    {
        name: "Sergio Aguero",
        image: "img/sa10.jpg",
    },
    {
        name: "Luis Suarez",
        image: "img/ls9.jpg",
    },
    {
        name: "Lionel Messi",
        image: "img/lm10.jpg",
    },
    {
        name: "Cristiano Ronaldo",
        image: "img/cr7.jpg",
    },
    {
        name: "Luka Modric",
        image: "img/lum10.jpg",
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
        name: "Neymar Jr.",
        image: "img/nj11.jpg",
    },
    {
        name: "Eden Hazard",
        image: "img/eh10.jpg",
    }
];

/* Global variables */
var count = 0;
var pair = 0;
var moves = 0;
var timeElapsed = 0;
var timer;
var src;
var id;
var hasSrc = [];
var hasId = [];

// -----V-I-E-W-M-O-D-E-L----- //

// Function to trigger the game to start when clicking on Start Modal
$(function() {
    $("#start").on('click', function() {
        startGame();
        $(this).off();
    });
});

// Function to Start the Game
var startGame = function() {

    //setTimeout function to Show and Hide the Modal
    setTimeout(function() {
        $('#startModal').hide();
        $('.fliprow').show();
        runGame();
    }, 100);

}

// Function to Run the Game
var runGame = function() {

    // Function to shuffle the Array of players 
    function shuffleArray(players) {
        for (var i = players.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = players[i];
            players[i] = players[j];
            players[j] = temp;
        }
        return players;
    }

    // Function Call
    shuffleArray(players);

    // Function to create the Cards
    function createCards(players) {
        var allCards = ' ';
        for (var i = 0; i < players.length; i++) {
            allCards = allCards + '<div class="flipper animated col-offset-7 col-sm-offset-6 col-md-offset-5 col-lg-offset-4 col-xl-offset-3" id="' + i + '"><div class="front"><img src="img/cover.jpg" class="img-responsive card"/></div><div class="back"><img src="' + players[i].image + '" class="img-responsive card"/></div></div>';
        }
        // Appending Cards in fliprow
        $(".fliprow").html(allCards);
    }

    // Function Call
    createCards(players);

    // Function to flip the Cards by toggling 'active' class
    function flipCard(self) {
        $(self).toggleClass('active');
    }

    // Initializing an interval function to update time at every 1 second.
    timer = setInterval(function() {
        timeElapsed += 1;
        $('#time').html(" " + timeElapsed);
    }, 1000);

    // Calling matchCards function on clicking of a flipper
    $('.flipper').on('click', matchCards);

    // Function to Check if Cards are same or not
    function matchCards() {

        // Function Call to flip 'this' particular Card
        flipCard(this);

        // Storing Id and Src of Clicked Cards
        id = $(this).attr('id');
        src = $($($(this).children()[1]).children()[0]).attr("src");

        // Counting Number of Moves
        count += 1;
        if (count % 2 == 0) {
            moves = count / 2;
            $("#moves").html(moves);
        }

        // Pushing values in Array if less than 2 Cards are open
        if (hasSrc.length < 2 && hasId.length < 2) {
            hasSrc.push(src);
            hasId.push(id);

            // Turning off Click on first Card
            if (hasId.length == 1)
                $(this).off('click');
        }

        // Matching the two opened Cards
        if (hasSrc.length == 2 && hasId.length == 2) {
            if (hasSrc[0] == hasSrc[1] && hasId[0] != hasId[1]) {
                // Counting Pairs
                pair += 1;

                // Turning off Click on matched Cards
                $.each(hasId, function(index) {
                    $('#' + hasId[index] + '').off("click");
                });

            } else {
                // Flipping back unmatched Cards with a bit of delay
                $.each(hasId, function(index, open) {
                    setTimeout(function() {
                        flipCard('#' + open + '');
                    }, 600);
                });

                // Turing on Click on first unmatched Card
                $('#' + hasId[0] + '').on("click", matchCards);
            }

            // Emptying the Arrays 
            hasSrc = [];
            hasId = [];
        }

        // Checking if all Cards are matched
        if (pair == 8) {
            endGame();
        }

    }

};

// Function to End the Game
var endGame = function() {

    // Calculating Random Score
    var score = Math.round(1000 / (timeElapsed + (moves * 10)));

    // Appending the score
    $('.score').html(score);

    // Assigning Stars according to number of moves
    if (moves <= 12) {
        var stars = '<i class="fa fa-star fa-4x" aria-hidden="true"></i> <i class="fa fa-star fa-4x" aria-hidden="true"></i> <i class="fa fa-star fa-4x" aria-hidden="true"></i>';
    } else if (moves <= 14) {
        var stars = '<i class="fa fa-star fa-4x" aria-hidden="true"></i> <i class="fa fa-star fa-4x" aria-hidden="true"></i> <i class="fa fa-star-half-o fa-4x" aria-hidden="true"></i>';
    } else if (moves <= 16) {
        var stars = '<i class="fa fa-star fa-4x" aria-hidden="true"></i> <i class="fa fa-star fa-4x" aria-hidden="true"></i> <i class="fa fa-star-o fa-4x" aria-hidden="true"></i>';
    } else if (moves <= 18) {
        var stars = '<i class="fa fa-star fa-4x" aria-hidden="true"></i> <i class="fa fa-star-half-o fa-4x" aria-hidden="true"></i> <i class="fa fa-star-o fa-4x" aria-hidden="true"></i>';
    } else if (moves <= 20) {
        var stars = '<i class="fa fa-star fa-4x" aria-hidden="true"></i> <i class="fa fa-star-o fa-4x" aria-hidden="true"></i> <i class="fa fa-star-o fa-4x" aria-hidden="true"></i>';
    } else {
        var stars = '<i class="fa fa-star-half-o fa-4x" aria-hidden="true"></i> <i class="fa fa-star-o fa-4x" aria-hidden="true"></i> <i class="fa fa-star-o fa-4x" aria-hidden="true"></i>';
    }

    // Appending Stars
    $('.stars').html(stars);

    // Stopping Clock
    clearInterval(timer);

    //setTimeout function to Show and Hide the Modal
    setTimeout(function() {
        $('.fliprow').hide();
        $('#winModal').show();

    }, 100);

}