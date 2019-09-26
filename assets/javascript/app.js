$(document).ready(function () {
    $("#time").hide();
    $("#start").on("click", gamePlay.startGame);
    $(document).on("click", '.choice', gamePlay.checkGuess);
    // $("#restart").on("click", gamePlay.startGame);
});

var gamePlay = {
    correct: 0,
    wrong: 0,
    unanswered: 0,
    currentQuestionIndex: 0,
    timer: 20,
    startTimer: false,
    timerId: "",

    questions: [
    {
        question: "In 'Bill and Ted's Excellent Adventure', where are 'strange things afoot'? ",
        choices: ["Circle K", "Exxon", "Racetrack", "Square C"],
        answer: 0
    },
    {
        question: "Who does Marty's mom like in 'Back to the Future' when Marty goes back in time?",
        choices: ["Dr. Emmet Brown", "George McFly", "Biff Tannen", "Marty McFly"],
        answer: 3
    },
    // {
    //     question: "What do the characters in 'Real Genius' fill Jerry's house with",
    //     choices: ["Post-it Notes", "Popcorn", "Balloons", "Shaving Cream"],
    //     answer: 1
    // },
    // {
    //     question: "What does Indiana Jones say when confronted with snakes in 'Raider of the Lost Ark?'",
    //     choices: ["Not snakes!", "Get me outta here!", "Snakes. Why did it have to be snakes.", "Of all the things, it had to be snakes!"],
    //     answer: 2
    // },
    // {
    //     question: "What is Yoda's famous line in 'The Empire Strikes Back' when he is training with Luke?",
    //     choices: ["Do or do not. There is no try", "Luminous beings are we, not this crude matter.", "Truly wonderful, the mind of a child is.", "Adventure. Excitement. A Jedi craves not these things."],
    //     answer: 0
    // },
    // {
    //     question: "What kind of car did Jake Ryan drive in 'Sixteen Candles'?",
    //     choices: ["Rolls Royce", "BMW", "Ferrari", "Porsche"],
    //     answer: 3
    // },
    // {
    //     question: "What are the rules for keeping a Gremlin?",
    //     choices: ["Don't talk to it, don't let it speak, and don't let it eat", "Keep him out of the light, don't give him any water, never feed him after midnight", "Make sure he has light, water him every hour, only feed him at night", "Name him Gizmo, make sure he has friends, keep him happy"],
    //     answer: 1
    // },
    // {
    //     question: "What iconic line does Bruce Campbell say in 'The Evil Dead' when he replaces his hand with a chainsaw?",
    //     choices: ["Sweet", "Awesome", "Groovy", "Radical"],
    //     answer: 2
    // },
    // {
    //     question: "What power does the babe have in 'Labyrinth'?",
    //     choices: ["the power of voodoo", "the power of hoodoo", "the power of joodoo", "the power of hulu"],
    //     answer: 0
    // },
    // {
    //     question: "'Die Hard' is a Christmas movie",
    //     choices: ["False", "True"],
    //     answer: 1
    // }
],

    startGame: function () {
        gamePlay.currentQuestionIndex = 0;
        gamePlay.correct = 0;
        gamePlay.wrong = 0;
        gamePlay.unanswered = 0;
        clearInterval(gamePlay.timerId);

        $('#results').html('');

        $('#timer').text(gamePlay.timer);

        $('#start').hide();

        $('#time').show();
        $('#game').show();

        gamePlay.nextQuestion();
    },

    nextQuestion: function () {
        gamePlay.timer = 20;
        $('#timer').removeClass('wait-second');
        $('#timer').text(gamePlay.timer);

        if (!gamePlay.startTimer) {
            gamePlay.timerId = setInterval(gamePlay.timeRun, 1000);
        }
        
        // if
        if (gamePlay.currentQuestionIndex < gamePlay.questions.length) {
        var questionObject = gamePlay.questions[gamePlay.currentQuestionIndex];

        $("#question").text(questionObject.question);
        $("#choices").empty();
        for(var i=0; i < questionObject.choices.length; i++) {
            $('#choices').append($('<button data-index="' + i + '"class="choice btn btn-other btn-large">' + questionObject.choices[i] + '</button>'));
        }
    }
        //end if
    },

    timeRun: function () {
        if (gamePlay.timer > -1 && gamePlay.currentQuestionIndex < gamePlay.questions.length) {
            $('#timer').text(gamePlay.timer);
            gamePlay.timer--;
            if (gamePlay.timer === 4) {
                $('#timer').addClass('wait-second');
            }
        } else if (gamePlay.timer === -1) {
            gamePlay.unanswered++;
            gamePlay.result = false;
            clearInterval(gamePlay.timerId);
            resultId = setTimeout(gamePlay.playerGuess, 2000);
            
            $('#results').html('<h3>Dude No! It was' + gamePlay.questions[gamePlay.currentQuestionIndex].choices[gamePlay.questions[gamePlay.currentQuestionIndex].answer] + '\'</h3>');
        } else if (gamePlay.currentQuestionIndex === (gamePlay.questions).length) {
            $('#results')
                .html('<h3>That was a radical run!</h3>' +
                    '<p id="displayStuff">Correct: ' + gamePlay.correct + '</p>' +
                    '<p id="displayStuff">Incorrect: ' + gamePlay.wrong + '</p>' +
                    '<p id="displayStuff">Unanswered: ' + gamePlay.unanswered + '</p>');
            $('#game').hide();

            $('#start').show();
        }
    },

    checkGuess: function(e) {
        var resultId;

        var correctAnswer = gamePlay.questions[gamePlay.currentQuestionIndex].answer;
        
        var playerAnswer = e.currentTarget.getAttribute("data-index");

        if(playerAnswer == correctAnswer) {
            $(e.currentTarget).addClass('btn-success').removeClass('btn-info');

            gamePlay.correct++;
            clearInterval(gamePlay.timerId);
            resultId = setTimeout(gamePlay.playerGuess, 1000);
            $('#results').html('<h3>Righteous!</h3>');
        }

        else {
            $(e.currentTarget).addClass('btn-danger').removeClass('btn-info');

            gamePlay.wrong++;
            clearInterval(gamePlay.timerId);
            resultId = setTimeout(gamePlay.playerGuess, 1000);
            $('#results').html('<h3>Bro, no! It was '+ gamePlay.questions[gamePlay.currentQuestionIndex].choices[gamePlay.questions[gamePlay.currentQuestionIndex].answer] +'</h3>');
        }
    },

    playerGuess: function() {
        gamePlay.currentQuestionIndex++;
        $('.choices').empty();
        $('#results h3').empty();

        gamePlay.nextQuestion();
    }
}
