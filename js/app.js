$(document).ready(function () {

    $("#guessList").hide();

    var secretNumber = generateRandomNumber(1, 100);
    //console.log(secretNumber);
    var oldGuess = 0;
    var counter = 20;
    var newScore = 1;
    var score = 20;
    var highscore = localStorage.getItem("high-score");
    if (highscore == null) {
        highscore = 20;
        localStorage.setItem("high-score", highscore);
    }
    //Display the high score that is saved in the local storage
    $("#highScore").text(highscore);
    //Display the score of the previous game
    $("#lastScore").text(localStorage.getItem('last-score'));

    // Function to start a new game
    function newGame() {
        document.location.reload(true);
    }

    // Function to generate the random number
    function generateRandomNumber(min, max) {
        var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber;
    }

    // Function to count the number of guesses
    function showGuessCounter(counter) {
        $('#count').text(counter);
    }

    // Function to show the history of guesses
    function guessHistory(guessedNumber) {
        $('#guessList').append('<li>' + guessedNumber + '</li>');
        if (counter < 11 && counter > 9) {
            $('#guessList').append('<br>');
        }
    }

    // Function to implement a simple validation of the user input
    function validation(guessedNumber) {

        //make sure that we get a number
        if (isNaN(guessedNumber)) {
            alert('You must enter a number!');
            //reset the guess value to nothing
            $('#userGuess').val('');
            return false; // this means, stop the loop and don't do anything else
        }

        //if the number is divisible by 1 it means it is an integer (it has no decimals)
        else if (guessedNumber % 1 !== 0) {
            alert('You must enter an integer value!');
            //reset the guess value to nothing
            $('#userGuess').val('');
            return false; // this means, stop the loop and don't do anything else
        }

        //if the guessedNumber is smaller than 1 OR the guessedNumber is bigger than 100...
        else if (guessedNumber < 1 || guessedNumber > 100) {
            alert('Please guess a number between 1 and 100!');
            //reset the guess value to nothing
            $('#userGuess').val('');
            return false; // this means, stop the loop and don't do anything else
        }

        //else the guessedNumber is valid
        else {
            guessFeedback(secretNumber, guessedNumber);
            counter--;
            score--;
            newScore++;
            if (counter == 0) {
                $('#feedback').text("You lose. The number was " + secretNumber);
                document.getElementById("userGuess").disabled = true;
                document.getElementById("guessButton").disabled = true;
            }
            //update the guess history
            guessHistory(guessedNumber);
            //update the number of guesses
            showGuessCounter(counter);
            $('#userGuess').val('');
        }
    };

    // Function to provide feedback to the user
    function guessFeedback(secretNumber, guessedNumber) {
        //show the absolute value of the difference between the secretNumber and guessedNumber
        var difference = Math.abs(secretNumber - guessedNumber);
        if (difference >= 50) {
            $('#feedback').text('Ice Cold!');
        } else if (difference >= 30 && difference <= 49) {
            $('#feedback').text('Cold!');
        } else if (difference >= 20 && difference <= 29) {
            $('#feedback').text('Warm!');
        } else if (difference >= 10 && difference <= 19) {
            $('#feedback').text('Hot!');
        } else if (difference >= 1 && difference <= 9) {
            $('#feedback').text('Very Hot!!');
        } else {
            $('#feedback').text('You got it. Well done!');
            document.body.style.backgroundColor = '#ff0404';
            document.getElementById("userGuess").disabled = true;
            document.getElementById("guessButton").disabled = true;
            var score = 20;
            var lastGame = (score - counter + 1);

            //save the score that will be displayed as previous game's data into local storage
            localStorage.setItem("last-score", lastGame);

            //if highscore, alert the player and save highscore to local storage
            if (highscore != null && newScore < highscore) {
                highscore = newScore;
                localStorage.setItem("high-score", highscore);
                alert("High Score!!!");
            }
        }
    }

    $('.new').on('click', newGame);

    $('#guessButton').on('click', function () {
        var guessedNumber = $('#userGuess').val();
        var newGuess = guessedNumber;
        $("#guessList").show();
        validation(guessedNumber);
    });

    $(document).on('keypress', function (e) {
        //on enter
        if (e.which === 13) {
            e.preventDefault();
            var guessedNumber = parseInt($('#userGuess').val(), 10);
            var newGuess = guessedNumber;
            $("#guessList").show();
            validation(guessedNumber);
        }
    });

    // Clear the Local Storage to erase high score and previous game data
    $("#reset").click(function () {
        window.localStorage.clear();
        location.reload();
        return false;
    });

    // Display information modal box
    $('.what').click(function () {
        $('.overlay').fadeIn(1000);
    });

    // Hide information modal box
    $('a.close').click(function () {
        $('.overlay').fadeOut(1000);
    });

});
