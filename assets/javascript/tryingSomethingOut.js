$(document).ready(function () {
    $("#time").hide();
    $("#start").on("click", gamePlay.startGame);
    $(document).on("click", '.options', gamePlay.checkGuess);
});

var gamePlay = {
    correct: 0,
    wrong: 0,
    unanswered: 0,
    currentQuestion: 0,
    timer: 20,
    startTimer: false,
    timerId: "",

    questions: {
        question1: "In Bill and Ted's Excellent Adventure, where are strange things afoot?",
        question2: "Who does Marty's mom like in Back to the Future when Marty goes back in time?",
        question3: "What do the characters in Real Genius fill Jerry's house with",
        question4: "What does Indiana Jones say when confronted with snakes in Raider of the Lost Ark?",
        question5: "What is Yoda's famous line in The Empire Strikes Back when he is training with Luke?",
        question6: "What kind of car did Jake Ryan drive in Sixteen Candles?",
        question7: "What are the rules for keeping a Gremlin?",
        question8: "What iconic line does Bruce Campbell say in 'The Evil Dead' when he replaces his hand with a chainsaw?",
        question9: "What power does the babe have in Labyrinth?",
        question10: "Die Hard is a Christmas movie"
    },

    choices: {
        question1: ["Circle K", "Exxon", "Racetrack", "Square C"],
        question2: ["Dr. Emmet Brown", "George McFly", "Biff Tannen", "Marty McFly"],
        question3: ["Post-it Notes", "Popcorn", "Balloons", "Shaving Cream"],
        question4: ["Not snakes!", "Get me outta here!", "Snakes. Why did it have to be snakes.", "Of all the things, it had to be snakes!"],
        question5: ["Do or do not. There is no try", "Luminous beings are we, not this crude matter.", "Truly wonderful, the mind of a child is.", "Adventure. Excitement. A Jedi craves not these things."],
        question6: ["Rolls Royce", "BMW", "Ferrari", "Porsche"],
        question7: ["Don't talk to it, don't let it speak, and don't let it eat", "Keep him out of the light, don't give him any water, never feed him after midnight", "Make sure he has light, water him every hour, only feed him at night", "Name him Gizmo, make sure he has friends, keep him happy"],
        question8: ["Sweet", "Awesome", "Groovy", "Radical"],
        question9: ["the power of voodoo", "the power of hoodoo", "the power of joodoo", "the power of hulu"],
        question10: ["False", "True"]
    },

    answers: {
        question1: "Circle K",
        question2: "Marty McFly",
        question3: "Popcorn",
        question4: "Snakes. Why did it have to be snakes",
        question5: "Do or do not. There is no try.",
        question6: "Porsche",
        question7: "Keep him out of the light, don't give him any water, never feed him after midnight",
        question8: "Groovy",
        question9: "the power of voodoo",
        question10: "true"
    },

    startGame: function () {
        gamePlay.currentQuestion = 0;
        gamePlay.correct = 0;
        gamePlay.wrong = 0;
        gamePlay.unanswered = 0;
        clearInterval(gamePlay.timerId);

        $('#results').html('');

        $('#timer').text(gamePlay.timer);

        $('#start').hide();

        $('#time').show();

        gamePlay.nextQuestion();
    },

    nextQuestion: function () {
        gamePlay.timer = 20;
        $('#timer').removeClass('wait-second');
        $('#timer').text(gamePlay.timer);

        if (!gamePlay.startTimer) {
            gamePlay.timerId = setInterval(gamePlay.timeRun, 1000);
        }

        var questionObject = Object.values(gamePlay.questions)[gamePlay.currentQuestion];

        $.each(questionObject, function (index, key) {
            $('#choices').append($('<button class="choices btn btn-info btn-large">' + key + '</button>'));
        });
    },

    timeRun: function () {
        if (gamePlay.timer > -1 && gamePlay.currentQuestion < Object.keys(gamePlay.questions).length) {
            $('#timer').text(gamePlay.timer);
            gamePlay.timer--;
            if (gamePlay.timer === 4) {
                $('#timer').addClass('wait-second');
            }
        } else if (gamePlay.timer === -1) {
            gamePlay.unanswered++;
            gamePlay.result = false;
            clearInterval(gamePlay.timerId);
            resultId = setTimeout(gamePlay.playerGuess, 1000);
            $('#results').html('<h3>Too Late! It was ' + Object.values(gamePlay.answers)[gamePlay.currentQuestion] + '</h3>');
        } else if (gamePlay.currentQuestion === Object.keys(gamePlay.questions).length) {
            $('#results')
                .html('<h3>Thanks you for playing!</h3>' +
                    '<p>Correct: ' + gamePlay.correct + '</p>' +
                    '<p>Incorrect: ' + gamePlay.incorrect + '</p>' +
                    '<p>Unanswered: ' + gamePlay.unanswered + '</p>' +
                    '<p>Try Again</p>');
            $('#game').hide();

            $('#start').show();
        }
    },

    checkGuess: function() {
        var resultId;

        var correctAnswer = Object.values(gamePlay.answers)[gamePlay.currentQuestion];

        if($(this).text() === correctAnswer) {
            $(this).addClass('btn-success').removeClass('btn-info');

            gamePlay.correct++;
            clearInterval(gamePlay.timerId);
            resultId = setTimeout(gamePlay.playerGuess, 1000);
            $('#results').html('<h3>Correct Answer!</h3>');
        }

        else {
            $(this).addClass('btn-danger').removeClass('btn-info');

            gamePlay.incorrect++;
            clearInterval(gamePlay.timerId);
            resultId = setTimeout(gamePlay.playerGuess, 1000);
            $('#results').html('<h3>Better luck next time! '+ correctAnswer +'</h3>');
        }
    },

    playerGuess: function() {
        gamePlay.currentQuestion++;
        $('.option').remove();
        $('#results h3').remove();

        gamePlay.nextQuestion();
    }
}